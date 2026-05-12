import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Music2, Stars, Lock, Sparkles } from 'lucide-react'

export default function RomanticLovePage() {
  const canvasRef = useRef(null)
  const [daysTogether, setDaysTogether] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const audioRef = useRef(null)
  const cursorRef = useRef(null)
  const [typingText, setTypingText] = useState('')

  const fullText = 'Every love story is beautiful, but ours is my favorite.'

  const loveMessages = [
    'You are my favorite notification ❤️',
    'Every moment with you feels magical ✨',
    'Home is wherever you are 🌙',
    'In another universe, I would still find you 💫',
  ]

  const [currentMessage, setCurrentMessage] = useState(0)
  

  const stars = Array.from({ length: 100 }, () => ({
    width: Math.random() * 3,
    height: Math.random() * 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 4,
  }))

  const petals = Array.from({ length: 25 }, () => ({
    left: Math.random() * 100,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 5,
    size: 12 + Math.random() * 18,
  }))

  useEffect(() => {
    let index = 0

    const typing = setInterval(() => {
      setTypingText(fullText.slice(0, index))
      index++

      if (index > fullText.length) {
        clearInterval(typing)
      }
    }, 60)

    return () => clearInterval(typing)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loveMessages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', moveCursor)

    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const startDate = new Date('2026-05-10')
    const now = new Date()
    const diff = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))
    setDaysTogether(diff)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const particles = []

    for (let i = 0; i < 1200; i++) {
      const t = Math.random() * Math.PI * 2
      const x = 16 * Math.pow(Math.sin(t), 3)
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t)

      particles.push({
        x,
        y,
        size: Math.random() * 2,
        offsetX: (Math.random() - 0.5) * 50,
        offsetY: (Math.random() - 0.5) * 50,
      })
    }

    let frame = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const pulse = 1 + Math.sin(frame * 0.05) * 0.08

      particles.forEach((p) => {
        const px = canvas.width / 2 + p.x * 18 * pulse + p.offsetX
        const py = canvas.height / 2 - p.y * 18 * pulse + p.offsetY

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,120,180,0.8)'
        ctx.fill()
      })

      frame++
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {showLoader && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-48 w-48 rounded-full bg-pink-500/20 blur-3xl" />
            <div className="animate-pulse text-8xl text-pink-400">❤</div>
          </div>

          <h1 className="mt-10 bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-5xl font-black text-transparent">
            Loading Love...
          </h1>

          <p className="mt-6 text-pink-100/60">
            Preparing something beautiful ✨
          </p>
        </div>
      )}

      <audio ref={audioRef} autoPlay loop>
        <source src="public/music/love.mp3" type="audio/mpeg" />
      </audio>

      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[999] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/20 blur-xl"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#ff4d8d33,transparent_35%),radial-gradient(circle_at_bottom,#8b5cf633,transparent_40%),radial-gradient(circle_at_center,#ffffff11,transparent_60%)]" />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-70 animate-pulse"
            style={{
              width: `${star.width}px`,
              height: `${star.height}px`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Particle Heart */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-80"
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[2]">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl animate-pulse" />
        {petals.map((petal, i) => (
          <div
            key={i}
            className="absolute animate-[fall_linear_infinite] text-pink-300 opacity-70"
            style={{
              left: `${petal.left}%`,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              fontSize: `${petal.size}px`,
            }}
          >
            🌹
          </div>
        ))}
      </div>

      {/* Music Floating Button */}
      <button
        onClick={() => {
          if (audioRef.current.paused) {
            audioRef.current.play()
          } else {
            audioRef.current.pause()
          }
        }}
        className="fixed right-6 top-6 z-50 rounded-full border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition hover:scale-110 hover:bg-white/20"
      >
        <Music2 className="text-pink-300" />
      </button>

      {/* Hero */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        <div className="mb-6 flex items-center gap-3 rounded-full border border-pink-400/20 bg-white/5 px-6 py-2 backdrop-blur-xl">
          <Stars className="h-4 w-4 text-pink-300" />
          <span className="text-sm tracking-[0.3em] text-pink-100/70 uppercase">
            A page written for someone special
          </span>
        </div>

        <div className="relative mb-10">
          <div className="absolute -inset-10 rounded-full bg-pink-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-full border border-white/10 shadow-[0_0_80px_rgba(255,0,120,0.4)]">
            <img
              src="/img/main.jpg"
              alt="her"
              className="h-52 w-52 object-cover transition duration-700 hover:scale-110"
            />
          </div>
        </div>

        <h1 className="bg-gradient-to-r from-pink-300 via-white to-purple-300 bg-clip-text text-6xl font-black text-transparent md:text-8xl">
          Lê Ánh Tuyết ❤️
        </h1>

        <div className="mt-10 rounded-full border border-pink-400/20 bg-white/5 px-6 py-3 backdrop-blur-xl">
          <span className="font-mono text-pink-200/80">
            {typingText}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="mt-8 rounded-2xl border border-pink-400/20 bg-white/5 px-8 py-4 text-pink-200/80 backdrop-blur-xl"
          >
            {loveMessages[currentMessage]}
          </motion.div>
        </AnimatePresence>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-pink-100/80 md:text-2xl">
          “Người ta chỉ sống có một lần trên đời, nhưng nếu sống đúng, một lần là đủ.” 
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-5 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-300/60">
              Together For
            </p>
            <h2 className="mt-2 text-4xl font-bold text-pink-300">
              {daysTogether} Days ❤
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-5 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-pink-300/60">
              Status
            </p>
            <h2 className="mt-2 text-4xl font-bold text-pink-300">
              Forever ♾
            </h2>
          </div>
        </div>

        <div className="mt-16 animate-bounce text-pink-200/60">
          Scroll to continue ↓
        </div>
      </section>

      {/* Timeline */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-32">
        <div className="mb-24 text-center">
          <h2 className="text-5xl font-bold md:text-6xl">
            Our Story 🌷
          </h2>
          <p className="mt-5 text-pink-100/70">
            Every memory with you feels cinematic.
          </p>
        </div>

        <div className="space-y-16">
          {[
            {
              title: '“Có những người chỉ xuất hiện một lần, nhưng đủ khiến trái tim nhớ cả đời.” ✨',
              text: 'Một sự bắt đầu rất nhẹ... nhưng đủ thay đổi cả thế giới.',
            },
            {
              title: '“Em là câu thơ đẹp nhất mà cuộc đời vô tình viết ra.” 💖',
              text: 'Có người bước vào cuộc đời như ánh sáng dịu dàng.',
            },
            {
              title: '“Tình yêu không nhìn bằng mắt, mà cảm bằng những điều rất nhỏ.” 🌙',
              text: 'Đêm dài trở nên ngắn hơn khi có người để nhớ.',
            },
            {
              title: '“Whatever our souls are made of, his and mine are the same.” — Emily Brontë ♾',
              text: 'Và dù bao nhiêu lần nữa... anh vẫn sẽ chọn em.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl transition duration-700 hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100 bg-gradient-to-r from-pink-500/10 via-transparent to-purple-500/10" />

              <div className="relative z-10 flex items-start gap-6">
                <div className="rounded-full bg-pink-500/20 p-4">
                  <Heart className="text-pink-300" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-pink-200">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-2xl leading-relaxed text-pink-100/70">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Romantic Gallery */}
      <section className="relative z-10 px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-bold">Favorite Moments 📸</h2>
            <p className="mt-4 text-pink-100/70">
              Tiny memories. Infinite feelings.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 perspective-[2000px]">
            {[
              '/img/photo1.jpg',
              '/img/photo2.jpg',
              '/img/photo3.jpg',
            ].map((src, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 transition duration-700 hover:-translate-y-4 hover:rotate-1 hover:scale-[1.02]"
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1 }}
                  src={src}
                  alt="memory"
                  className="h-[500px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secret Message */}
      <section className="relative z-10 px-6 py-32 text-center">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/10 bg-white/5 p-12 backdrop-blur-2xl">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-pink-500/20 p-5">
              <Lock className="text-pink-300" />
            </div>
          </div>

          <h2 className="text-4xl font-bold">Secret Message 🔒</h2>

          <p className="mt-4 text-pink-100/70">
            Có những điều chỉ muốn nói với riêng một người.
          </p>

          <button
            onClick={() => setShowSecret(!showSecret)}
            className="mt-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-8 py-4 font-semibold transition hover:scale-105"
          >
            Open My Heart
          </button>

          {showSecret && (
            <div className="mt-10 rounded-3xl border border-pink-400/20 bg-black/20 p-8 text-lg leading-relaxed text-pink-100/80 animate-pulse">
              “Trên đời này có hàng triệu người... nhưng chỉ có một người khiến anh muốn quay về mỗi ngày.”
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <section className="relative z-10 overflow-hidden px-6 py-32">
        <div className="mx-auto max-w-5xl rounded-[3rem] border border-white/10 bg-white/5 p-16 backdrop-blur-2xl text-center">
          <h2 className="text-5xl font-black bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
            Infinite Love Mode ❤️
          </h2>

          <p className="mt-8 text-xl leading-relaxed text-pink-100/70">
            “Anh không biết tương lai sẽ thế nào... nhưng nếu được chọn,
            anh vẫn muốn mọi khoảnh khắc đẹp nhất đều có em ở đó.”
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {['Forever', 'Soulmate', 'Favorite Person', 'My Home'].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="rounded-full border border-pink-400/20 bg-black/20 px-6 py-3 text-pink-200/80 backdrop-blur-xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-5xl font-black text-white">
            Relationship Timeline ⏳
          </h2>

          <div className="space-y-10">
            {[
              {
                title: 'The First Hello',
                text: 'The moment everything quietly started changing.',
              },
              {
                title: 'Late Night Talks',
                text: 'Hours felt like minutes whenever we talked.',
              },
              {
                title: 'Favorite Person',
                text: 'Without realizing it, you became home.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
              >
                <h3 className="text-2xl font-bold text-pink-300">
                  {item.title}
                </h3>

                <p className="mt-4 text-pink-100/70">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSecret(!showSecret)}
          className="rounded-full border border-pink-400/20 bg-pink-500/10 px-10 py-5 text-lg font-semibold text-pink-200 backdrop-blur-xl"
        >
          Open Secret Letter 💌
        </motion.button>

        <AnimatePresence>
          {showSecret && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mt-12 max-w-3xl rounded-[3rem] border border-white/10 bg-black/40 p-12 backdrop-blur-3xl"
            >
              <h3 className="text-4xl font-black text-pink-300">
                To Bé Tít ❤️
              </h3>

              <p className="mt-8 text-lg leading-relaxed text-pink-100/70">
                If someday you wonder how important you are to me,
                remember this website exists because of you.
                Every animation, every line, every glowing light here
                was made with thoughts about you.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <footer className="relative z-10 border-t border-white/10 py-12 text-center">
        <div className="flex items-center justify-center gap-3 text-pink-200/70">
          <Sparkles className="h-5 w-5" />
          <span>Made with infinite love ✨</span>
        </div>
      </footer>

      <style>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          cursor: none;
          overflow-x: hidden;
          background: black;
        }

        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(45deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateX(-1200px) translateY(400px) rotate(45deg);
            opacity: 0;
          }
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-\[fall_linear_infinite\] {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
      </motion.div>
    </>
  )
}

