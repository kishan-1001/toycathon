import React from 'react';

const RoleSelector = ({ selected, onChange }) => {
  const roles = [
    { id: 'parent', label: 'Parent/Guardian', icon: '👨‍👩‍👦', desc: 'Monitor and guide' },
    { id: 'student', label: 'Student', icon: '🎓', desc: 'Learn and play' }
  ];

  return (
    <div className="mb-6">
      <label className="block text-purple-100 font-medium mb-3">I am a...</label>
      <div className="grid grid-cols-2 gap-3">
        {roles.map(role => (
          <div
            key={role.id}
            onClick={() => onChange(role.id)}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all transform hover:scale-[1.02] ${
              selected === role.id
                ? 'border-purple-400 bg-purple-500/20 shadow-lg'
                : 'border-purple-300/30 bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-3xl mb-2">{role.icon}</div>
            <div className="text-white font-semibold text-sm">{role.label}</div>
            <div className="text-purple-200 text-xs">{role.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
