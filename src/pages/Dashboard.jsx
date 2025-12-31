import React from 'react';
import Navbar from '../components/Navbar';
import units from '../data/units.json';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ArrowRight, Book, Star } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen pb-20">
      <SEO title="Dashboard" description="Track your progress and access your German lessons." />
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-6">
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Dein Kurs</h1>
          <p className="text-slate-500">Continue where you left off. You are making great progress!</p>
        </header>

        <div className="grid gap-6">
          {units.map((unit) => (
            <UnitCard key={unit.id} unit={unit} />
          ))}
        </div>
      </main>
    </div>
  );
}

function UnitCard({ unit }) {
  return (
    <div className="glass-panel p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wide uppercase">
              Unit
            </span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800 group-hover:text-blue-600 transition-colors">
            {unit.title}
          </h2>
          <p className="text-slate-600 mb-4">{unit.description}</p>
          
          <div className="flex gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><Book size={16} /> {unit.lessons.length} Lessons</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to={`/unit/${unit.id}`}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group-hover:scale-105"
          >
            Start Unit <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
