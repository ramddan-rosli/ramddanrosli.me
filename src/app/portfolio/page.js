"use client"

import React, { useState, useEffect } from 'react';
import { Github, Lock, ExternalLink } from 'lucide-react';

const Portfolio = () => {
    const [filter, setFilter] = useState('all');
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const privateProjects = [
        {
            title: "Telegram Bot Management System",
            type: "private",
            description: "A powerful and user-friendly system designed to manage Telegram bots and automate group interactions.",
            tech: ["Laravel", "Blade"],
            client: "Local Retail Company",
            year: "2024"
        },
        {
            title: "Visitor Management System",
            type: "private",
            description: "A comprehensive Visitor Management System designed to streamline and secure the process of managing visitors.",
            tech: ["Laravel", "Livewire"],
            client: "Vista Bangi Management",
            year: "2024"
        },
        {
            title: "Catch Math Game",
            type: "private",
            description: "Catch math game is an interactive and fun math-based game designed to challenge your calculation skills while keeping you entertained. Whether you're solving addition, subtraction, multiplication, or division problems, this game tests your reflexes and sharpens your mind!",
            tech: ["React", "Vite"],
            client: "My Son",
            year: "2024",
            live: "https://game.ramddanrosli.me"
        },
    ];

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch('https://api.github.com/users/ramddan-rosli/repos');
                const data = await response.json();
                const publicRepos = data
                    .filter(repo => !repo.fork)
                    .map(repo => ({
                        title: repo.name,
                        type: "public",
                        description: repo.description || "No description available",
                        tech: [repo.language].filter(Boolean),
                        github: repo.html_url,
                        live: repo.homepage || "",
                        year: new Date(repo.created_at).getFullYear().toString()
                    }));

                const allProjects = [...publicRepos, ...privateProjects];

                // Sort by year descending (latest first)
                const sortedProjects = allProjects.sort((a, b) => b.year - a.year);

                setRepos(sortedProjects);
            } catch (error) {
                console.error('Error fetching repos:', error);
                setRepos(privateProjects.sort((a, b) => b.year - a.year));
            } finally {
                setIsLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const filteredProjects = filter === 'all'
        ? repos
        : repos.filter(project => project.type === filter);

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="fixed top-0 w-full bg-black/50 backdrop-blur-sm z-10 animate-slideDown">
                <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <a href="/" className="text-xl font-mono hover:text-gray-300 transition-colors">Ramddan Rosli</a>
                </nav>
            </header>

            <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-mono mb-12 animate-fadeIn">
                    Featured Projects
                </h1>

                <div className="flex space-x-4 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                    {['all', 'public', 'private'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`px-4 py-2 rounded-full text-sm font-mono transition-all duration-300 transform hover:scale-105
                                ${filter === type ? 'bg-white text-black' : 'bg-transparent text-white border border-white/20 hover:bg-white/10'}`}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="text-center py-20">Loading projects...</div>
                ) : (
                    <div className="space-y-8">
                        {filteredProjects.map((project, index) => (
                            <div
                                key={index}
                                className="group border border-white/10 rounded-lg p-6 hover:border-white/30 transition-all duration-300 animate-slideUp"
                                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl font-mono group-hover:translate-x-2 transition-transform duration-300">
                                                {project.title}
                                            </h3>
                                            {project.type === 'private' && (
                                                <Lock className="w-4 h-4 text-gray-400 group-hover:rotate-12 transition-transform duration-300" />
                                            )}
                                        </div>
                                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 bg-white/15 rounded-full hover:bg-white/10 transition-colors duration-300"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-500 group-hover:scale-110 transition-transform duration-300">
                                        {project.year}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-4 text-sm">
                                    {project.type === 'public' ? (
                                        <>
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                className="flex items-center hover:text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                            >
                                                <Github className="w-4 h-4 mr-1" />
                                                Source
                                            </a>
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    className="flex items-center hover:text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-1" />
                                                    Preview
                                                </a>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            {project.live && (
                                                <a
                                                    href={project.live}
                                                    target="_blank"
                                                    className="flex items-center hover:text-gray-400 transition-colors duration-300 hover:translate-x-1"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-1" />
                                                    Preview
                                                </a>
                                            )}
                                            <span className="text-gray-500">
                                                Client: {project.client}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Portfolio;