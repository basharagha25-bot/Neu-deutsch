import React from 'react';
import Navbar from '../components/Navbar';
import { useParams, Link } from 'react-router-dom';
import units from '../data/units.json';
import InteractiveText from '../components/InteractiveText';
import PracticeArea from '../components/PracticeArea';
import SEO from '../components/SEO';
import { ArrowLeft, PlayCircle, MessageCircle } from 'lucide-react';

export default function UnitView() {
  const { unitId } = useParams();
  const unit = units.find(u => u.id === unitId);

  if (!unit) return <div>Unit not found</div>;

  return (
    <div className="min-h-screen pb-20">
      <SEO title={unit.title} description={unit.description} />
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors">
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>
        
        <header className="mb-10">
          <h1 className="text-3xl font-bold mb-2">{unit.title}</h1>
          <p className="text-slate-500">{unit.description}</p>
        </header>

        <div className="space-y-12">
          {unit.lessons.map((lesson, index) => (
            <LessonSection key={lesson.id} lesson={lesson} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}

function LessonSection({ lesson, index }) {
  return (
    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
          {index + 1}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{lesson.title}</h3>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {lesson.type === 'reading' ? <BookIcon /> : <MessageIcon />}
            {lesson.type}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <InteractiveText content={lesson.content} contentArabic={lesson.contentArabic} />
      </div>

      <div className="mt-8">
        <PracticeArea />
      </div>
    </section>
  );
}



function BookIcon() {
  return <PlayCircle size={14} />;
}

function MessageIcon() {
  return <MessageCircle size={14} />;
}
