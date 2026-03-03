import React from 'react';
import Image from 'next/image';

interface Curator {
  name: string;
  role: string;
  image: string;
  href: string;
}

const curators: Curator[] = [
  {
    name: "Andre do Amaral",
    role: "Founder, Savee",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-7.webp",
    href: "/awards/curators/andre-do-amaral",
  },
  {
    name: "Andy Allen",
    role: "Designer, Not Boring Software",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-8.webp",
    href: "/awards/curators/andy-allen",
  },
  {
    name: "Fons Mans",
    role: "Creative Director, Offgrid",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-9.webp",
    href: "/awards/curators/fons-mans",
  },
  {
    name: "Gil Huybrecht",
    role: "Independent Art Designer",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-10.webp",
    href: "/awards/curators/gil-huybrecht",
  },
  {
    name: "Jason Chin",
    role: "Founder, Easlo",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-11.webp",
    href: "/awards/curators/jason-chin",
  },
  {
    name: "Joey Banks",
    role: "Founder, Baseline Design",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-12.webp",
    href: "/awards/curators/joey-banks",
  },
  {
    name: "Rafael Conde",
    role: "Designer, Retro",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-13.webp",
    href: "/awards/curators/rafael-conde",
  },
  {
    name: "Sara Vienna",
    role: "Chief Design Officer, Metalab",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-14.webp",
    href: "/awards/curators/sara-vienna",
  },
  {
    name: "Tobias van Schneider",
    role: "Co-Founder, MyMind",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-15.webp",
    href: "/awards/curators/tobias-van-schneider",
  },
  {
    name: "Zhenya Rynzhuk",
    role: "Design Director, Synchronized",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/ac7698f2-a38b-41d3-98e1-66161d9459d0-mobbin-com/assets/images/file-16.webp",
    href: "/awards/curators/zhenya-rynzhuk",
  },
];

const CuratorCard = ({ curator }: { curator: Curator }) => (
  <li className="list-none">
    <a href={curator.href} className="group block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0071e3]/50 rounded-24">
      <figure className="relative aspect-[4/5] overflow-hidden rounded-24 bg-[#F5F5F7]">
        <Image
          src={curator.image}
          alt={curator.name}
          fill
          className="h-full w-full object-cover transition-all duration-300 ease-out grayscale group-hover:grayscale-0"
          sizes="(max-width: 720px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {/* Subtle gradient overlay for text legibility at bottom */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300" />
        
        <figcaption className="absolute bottom-20 z-10 flex w-full flex-row flex-wrap items-center justify-center gap-x-6 px-20 text-center">
          <span className="text-[14px] font-normal leading-[1.4] text-white">
            {curator.name}
          </span>
          <span className="text-[14px] font-normal leading-[1.4] text-[#AEAEB2]">
            {curator.role}
          </span>
        </figcaption>
      </figure>
    </a>
  </li>
);

export default function CuratorSection() {
  return (
    <section 
      className="flex flex-col items-center place-self-center w-full max-w-[calc(1280px+304px)] px-16 min-[1024px]:px-[152px] pt-80 pb-[240px] gap-y-64 min-[1280px]:gap-y-[120px]"
      id="curators"
    >
      <div className="flex flex-col items-center gap-y-24">
        <h2 className="text-center text-[56px] font-semibold leading-[1.2] tracking-[-0.03em] text-black">
          Curators
        </h2>
        <p className="max-w-[586px] text-center text-balance text-[20px] font-normal leading-[1.5] text-[#6E6E73]">
          Our expert curators represent some of the strongest voices in digital product design. They have reviewed hundreds of entries to identify and shortlist the very best.
        </p>
      </div>

      <ul className="grid w-full grid-cols-1 gap-16 min-[720px]:grid-cols-2 min-[1280px]:grid-cols-3">
        {curators.map((curator, index) => (
          <CuratorCard key={index} curator={curator} />
        ))}
      </ul>
    </section>
  );
}