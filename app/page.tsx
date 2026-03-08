'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { GROUP_FACTS, PEOPLE } from '@/lib/data';
import { FloatingFlowers } from '@/components/effects/FloatingFlowers';
import { ComplimentGenerator } from '@/components/ComplimentGenerator';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

function CountUp({ end, duration = 2 }: { end: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;

    if (end === '∞' || end === '100%') {
      setCount(1);
      return;
    }

    const numericEnd = parseInt(end);
    if (isNaN(numericEnd)) return;

    let start = 0;
    const increment = numericEnd / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericEnd) {
        setCount(numericEnd);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {end === '∞' ? '∞' : end === '100%' ? '100%' : count}
    </span>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div className="min-h-screen bg-pink-50/50 overflow-hidden font-nunito relative">
      <FloatingFlowers count={25} />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="glass p-10 sm:p-14 rounded-[3rem] shadow-2xl border border-white/60 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-block px-6 py-2 rounded-full bg-white/50 text-pink-500 font-bold tracking-widest uppercase text-sm border border-pink-200 shadow-sm">
                Специально для вас
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl font-black mb-8 font-comfortaa leading-tight text-gradient-rose drop-shadow-sm">
              С 8 Марта, наши дорогие!
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-xl sm:text-2xl text-navy/70 leading-relaxed font-medium mb-10 max-w-2xl mx-auto"
            >
              Этот сайт мы сделали для вас — десяти человек, без которых наша группа была бы просто кучкой программистов.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex justify-center gap-6 sm:gap-8 text-4xl sm:text-5xl"
            >
              {['💐', '✨', '💝'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                  className="drop-shadow-md"
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FACTS SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-center mb-16 text-navy font-comfortaa"
          >
            Почему вы особенные
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {GROUP_FACTS.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.03, y: -5 }}
                className="glass rounded-3xl p-8 shadow-lg border border-white/60 text-center h-full hover:shadow-xl hover:border-pink-200 transition-all"
              >
                <div className="text-5xl mb-6 drop-shadow-sm">{fact.icon}</div>
                <div className="text-5xl font-black mb-4 text-pink-500 font-comfortaa">
                  <CountUp end={fact.number} />
                </div>
                <p className="text-navy/80 font-medium text-lg leading-relaxed">{fact.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LETTER SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="glass bg-white/60 p-8 sm:p-14 rounded-[2rem] shadow-xl border-2 border-pink-100 relative">
              <div className="absolute top-6 right-6 text-5xl opacity-40">🌸</div>
              <div className="absolute bottom-6 left-6 text-5xl opacity-40">🌺</div>

              <div className="max-w-3xl mx-auto space-y-6 text-navy/80 font-medium text-lg sm:text-xl leading-relaxed">
                <h2 className="text-3xl sm:text-4xl font-black text-center mb-10 text-pink-500 font-comfortaa">
                  Дорогие наши девушки,
                </h2>

                <p>
                  Мы долго думали, что написать, и поняли — слов всё равно не хватит.
                </p>

                <p>
                  Вы — это не просто "женская часть группы". Вы — это те, кто делает наши пары не такими скучными.
                  Те, кто помнит, когда дедлайн (и напоминает нам за 5 минут до него). Те, с кем можно и посмеяться,
                  и поговорить серьёзно.
                </p>

                <div className="my-8 space-y-3 bg-pink-50/50 p-6 sm:p-8 rounded-2xl border border-pink-100">
                  <p><strong className="text-pink-600">Вика</strong> — человек, чья улыбка заряжает энергией.</p>
                  <p><strong className="text-teal-600">Интизар</strong> — сила духа и целеустремлённость.</p>
                  <p><strong className="text-purple-600">Олеся</strong> — тепло и уют в любой компании.</p>
                  <p><strong className="text-rose-600">Карина</strong> — яркость и харизма.</p>
                  <p><strong className="text-emerald-600">Ася</strong> — радость и позитив.</p>
                  <p><strong className="text-blue-600">Настя</strong> — мечты и вдохновение.</p>
                  <p><strong className="text-orange-600">Арина</strong> — улыбка, которая украшает день.</p>
                  <p><strong className="text-teal-700">Соня</strong> — доброе сердце.</p>
                  <p><strong className="text-violet-600">Милена</strong> — настоящее чудо.</p>
                  <p className="mt-4"><strong className="text-purple-700">Марина Юрьевна</strong> — человек, который терпит нас всех и каким-то чудом не сошёл с ума.</p>
                </div>

                <p>Спасибо, что вы есть.</p>
                <p>Спасибо, что вы с нами.</p>
                <p className="mb-8">Спасибо, что вы — это вы.</p>

                <div className="text-right mt-12 bg-white/50 p-6 rounded-2xl inline-block float-right border border-pink-50">
                  <p className="text-navy/60 italic text-base">С любовью, уважением и лёгким страхом,</p>
                  <p className="font-bold text-navy text-xl font-comfortaa mt-1">Ваши 17 однокурсников</p>
                </div>
                <div className="clear-both"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* COMPLIMENT GENERATOR SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-[3rem] p-10 sm:p-14 text-center border-2 border-white/60 shadow-xl"
          >
            <div className="text-6xl mb-6">🎰</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-navy font-comfortaa">
              Машина комплиментов
            </h2>
            <p className="text-navy/60 mb-10 max-w-lg mx-auto text-lg">
              Она работает автоматически и генерирует приятности каждые 5 секунд. Просто смотри и наслаждайся!
            </p>
            <div className="max-w-2xl mx-auto">
              <ComplimentGenerator />
            </div>
          </motion.div>
        </div>
      </section>

      {/* GIRLS CARDS SECTION */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-center mb-16 text-navy font-comfortaa"
          >
            Найди свою открытку 💌
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center">
            {PEOPLE.map((person, index) => (
              <Link key={person.slug} href={`/${person.slug}`}>
                <div
                  className="glass p-6 text-center rounded-3xl shadow-lg border border-white/60 hover:shadow-xl hover:border-pink-300 transition-all cursor-pointer h-full flex flex-col items-center justify-center gap-3 bg-white/40 hover:bg-white/60 group hover:scale-105 hover:-translate-y-1 active:scale-95"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-rose-200 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {person.name[0]}
                  </div>
                  <span className="font-bold text-navy font-comfortaa text-lg">
                    {person.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* QUEST TEASER SECTION */}
      <section className="py-32 relative z-10 overflow-hidden">
        {/* Abstract background for dark theme feel inside light theme */}
        <div className="absolute inset-0 bg-navy/5 backdrop-blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto glass p-12 sm:p-16 rounded-[3rem] border border-white/40 shadow-2xl"
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-black mb-8 font-comfortaa text-navy bg-clip-text"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Ваши персональные поздравления 🎁
            </motion.h2>

            <p className="text-xl text-navy/80 mb-10 leading-relaxed font-medium">
              Каждой из вас мы подготовили отдельную секретную страницу. На ней вас ждёт кое-что особенное и личное!
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-white/60 p-6 rounded-2xl border border-pink-200 shadow-sm"
            >
              <p className="text-pink-600 font-bold text-lg mb-2">
                Готовы получить свой подарок?
              </p>
              <p className="text-navy/70 text-sm sm:text-base">
                Найдите своё имя в карточках выше и кликните на неё, чтобы увидеть личную страницу.
                Именно оттуда вы сможете забрать свой подарок и начать квест! ✨
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-navy/50 text-sm font-medium uppercase tracking-widest"
            >
              С любовью, парни 4 курса ❤️
            </motion.p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
