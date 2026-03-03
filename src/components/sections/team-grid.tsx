import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  company: string;
  image: string;
}

const teamMembers: TeamMember[] = [
    {
      name: 'Jiho Lim',
      role: 'CEO & Founder',
      company: 'swivo',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=80',
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Engineering',
      company: 'swivo',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80',
    },
    {
      name: 'Michael Ross',
      role: 'Head of AI',
      company: 'swivo',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80',
    },
  ];

const TeamGrid = () => {
  return (
    <section className="flex flex-col items-center gap-y-64 px-4 min-[1024px]:px-[152px] pb-[160px] min-[1024px]:pb-[240px] pt-20 min-[1024px]:pt-80 max-w-[1280px] min-[1024px]:max-w-full mx-auto">
      <div className="flex flex-col items-center gap-y-6 min-[1024px]:gap-y-8">
        <h2 className="text-center text-[48px] min-[1024px]:text-[64px] font-semibold tracking-[-0.02em] min-[1024px]:tracking-[-0.04em] leading-[1.2] min-[1024px]:leading-[1.1] text-[#121212]">
          Our Team
        </h2>
        <p className="max-w-[586px] text-balance text-center text-[24px] font-normal leading-[1.5] text-[#666666]">
          The minds behind the most intelligent agents on the internet.
        </p>
      </div>

      <ul className="grid w-full gap-4 grid-cols-1 min-[720px]:grid-cols-2 min-[1280px]:grid-cols-3">
        {teamMembers.map((member, index) => (
          <li key={`${member.name}-${index}`} className="group cursor-pointer">
            <figure className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#F3F3F3]">
              <img
                className="h-full w-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
                src={member.image}
                alt={member.name}
                loading="lazy"
              />
              
              {/* Hover Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <figcaption className="absolute bottom-5 left-0 right-0 z-10 px-5 flex flex-col items-center justify-center text-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <span className="text-[16px] font-semibold leading-tight text-white mb-1">
                  {member.name}
                </span>
                <span className="text-[14px] font-medium text-white/70">
                  {member.role}{member.company ? `, ${member.company}` : ''}
                </span>
              </figcaption>
              
              {/* Default Label */}
              <div className="absolute bottom-5 left-0 right-0 z-0 px-5 flex flex-row flex-wrap items-center justify-center gap-x-2 text-center text-[14px] leading-tight transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                <span className="text-[#121212] font-semibold">{member.name}</span>
                <span className="text-[#A3A3A3] font-normal">{member.role}</span>
              </div>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeamGrid;
