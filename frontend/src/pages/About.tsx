import { useEffect, useRef } from "react";
import aboutImage1 from "../assets/img/camisa1.jpg";
import aboutImage2 from "../assets/img/camisa2.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Título
      gsap.fromTo(titleRef.current, 
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Primera imagen
      gsap.fromTo(image1Ref.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image1Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Primer texto
      gsap.fromTo(text1Ref.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text1Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Segunda imagen
      gsap.fromTo(image2Ref.current,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image2Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Segundo texto
      gsap.fromTo(text2Ref.current,
        {
          opacity: 0,
          y: -50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text2Ref.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Refresh ScrollTrigger después de que se carguen las imágenes
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="p-8">
      <h1
        ref={titleRef}
        className="text-4xl italic mt-2 font-bold underline text-center mb-12"
      >
        Wear clothes with perspective
      </h1>

      <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
        <img
          ref={image1Ref}
          src={aboutImage1}
          alt=""
          className="w-full md:w-1/2 object-cover md:translate-y-32"
          onLoad={() => ScrollTrigger.refresh()}
        />

        <div ref={text1Ref} className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-700">
            At Sizzilia Code, we believe fashion should be more than just fabric
            – it's an attitude. Founded in 2025 in the heart of Las Palmas, Gran
            Canarias, our mission is to redefine how we wear and perceive
            clothing. Every piece tells a story, every stitch has a purpose.
          </p>
          <p className="text-gray-700">
            We create collections that merge comfort with style, using
            eco-friendly materials and ethical practices. For us, perspective is
            everything – and we want our clothes to inspire you to see the world
            differently.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12 mt-12 items-center">
        <img
          ref={image2Ref}
          src={aboutImage2}
          alt=""
          className="w-full md:w-1/2 rounded shadow-md object-cover max-h-100 max-w-md"
          onLoad={() => ScrollTrigger.refresh()}
        />

        <div ref={text2Ref} className="flex flex-col gap-4 ml-16">
          <h2 className="text-2xl font-semibold">Our Values</h2>
          <ul className="list-disc pl-5 text-gray-700">
            <li>🌿 Sustainability & ethics in every stitch.</li>
            <li>✨ Creativity that challenges the ordinary.</li>
            <li>🤝 Community – connecting people through fashion.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;