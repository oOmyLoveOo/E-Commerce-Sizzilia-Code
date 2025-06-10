import camisa1 from "../assets/img/camisa1.jpg";
import camisa2 from "../assets/img/camisa2.jpg";
import camisa3 from "../assets/img/camisa3.jpg";
import camisa4 from "../assets/img/camisa4.jpg";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Novelty = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const bottomPRef = useRef<HTMLDivElement>(null);
  const bottomH2Ref = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            scale: 1,
            autoAlpha: 1,
          },
          {
            scale: 2,
            autoAlpha: 0,
            scrollTrigger: {
              scrub: 0.1,
            },
          }
        );
      }

      // Bottom paragraph animation
      if (bottomPRef.current) {
        gsap.fromTo(
          bottomPRef.current,
          {
            clipPath: 'inset(100% 0 0 0)',
            scale: 1.3,
            autoAlpha: 0,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            autoAlpha: 1,
            scale: 1,
            scrollTrigger: {
              trigger: bottomPRef.current.parentElement,
              start: "top 80%",
              end: "center 60%",
              scrub: 2,
            }
          }
        );
      }

      // Bottom line animation
      if (bottomLineRef.current && bottomPRef.current) {
        gsap.fromTo(
          bottomLineRef.current,
          {
            clipPath: 'inset(100% 0 0 0)',
            scale: 1.2,
            autoAlpha: 0,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            autoAlpha: 1,
            scale: 1,
            scrollTrigger: {
              trigger: bottomPRef.current.parentElement,
              start: "center 70%",
              end: "center 50%",
              scrub: 2,
            }
          }
        );
      }

      // Bottom h2 animation
      if (bottomH2Ref.current && bottomPRef.current) {
        gsap.fromTo(
          bottomH2Ref.current,
          {
            clipPath: 'inset(100% 0 0 0)',
            scale: 1.4,
            autoAlpha: 0,
          },
          {
            clipPath: 'inset(0% 0 0 0)',
            autoAlpha: 1,
            scale: 1,
            scrollTrigger: {
              trigger: bottomPRef.current.parentElement,
              start: "center 50%",
              end: "center 20%",
              scrub: 2,
            }
          }
        );
      }

      // Image animations - Adjusted for responsive
      const imageAnimations = [
        { ref: img1Ref, x: -150 }, 
        { ref: img2Ref, x: 80 },  
        { ref: img3Ref, x: -150 }, 
        { ref: img4Ref, x: -150 }  
      ];

      imageAnimations.forEach(({ ref, x }) => {
        if (ref.current) {
          gsap.fromTo(
            ref.current,
            {
              x: window.innerWidth < 768 ? x * 0.3 : x, // Reduce movement on mobile
              autoAlpha: 0,
              scale: 0.7,
            },
            {
              x: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1.5,
              ease: "power1.out",
              scrollTrigger: {
                trigger: ref.current,
                scrub: 1,
                end: "top 50%",
              }
            }
          );
        }
      });

    });
    
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-gray-900 overflow-x-hidden">
      <div className="relative z-20">
        <div className="flex items-start justify-center h-screen pt-26 px-4">
          <div ref={headerRef} className="text-center max-w-full">
            <h1 className="text-4xl sm:text-6xl md:text-9xl text-white mb-8 tracking-tighter leading-none">
              Sizzilia Code
            </h1>
            <div className="w-32 sm:w-48 md:w-64 h-0.5 bg-gradient-to-r via-white mx-auto opacity-60">
            </div>
            <p className="text-lg sm:text-xl font-light text-white/70 mt-6 tracking-wide px-4">
              Raw. Unfiltered. Stylish.
            </p>
          </div>
        </div>

        {/* Gallery Section - Responsive Grid */}
        <div className="min-h-screen py-8 px-4 sm:px-8 md:px-12 lg:px-16">
          
          {/* Mobile Layout: Simple Stack */}
          <div className="block md:hidden space-y-6">
            <div ref={img1Ref} className="w-full aspect-[4/5]">
              <img src={camisa1} alt="" className="w-full h-full object-cover rounded-lg"/>
            </div>
            
            <div ref={img2Ref} className="w-full aspect-[4/5]">
              <img src={camisa2} alt="" className="w-full h-full object-cover rounded-lg"/>
            </div>
            
            <div ref={img3Ref} className="w-full aspect-[4/5]">
              <img src={camisa3} alt="" className="w-full h-full object-cover rounded-lg"/>
            </div>
            
            <div ref={img4Ref} className="w-full aspect-[4/5]">
              <img src={camisa4} alt="" className="w-full h-full object-cover rounded-lg"/>
            </div>
          </div>

          {/* Tablet Layout: 2x2 Grid */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-2 gap-6 h-full">
              <div ref={img1Ref} className="aspect-[4/5]">
                <img src={camisa1} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>
              
              <div ref={img2Ref} className="aspect-[4/5]">
                <img src={camisa2} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>
              
              <div ref={img3Ref} className="aspect-[4/5]">
                <img src={camisa3} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>
              
              <div ref={img4Ref} className="aspect-[4/5]">
                <img src={camisa4} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>
            </div>
          </div>

          {/* Desktop Layout: Original Masonry Grid */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-6 grid-rows-12 gap-6 h-full min-h-[120vh]">
              
              <div ref={img1Ref} className="col-span-3 row-span-4 col-start-1 row-start-1">
                <img src={camisa1} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>

              <div ref={img2Ref} className="col-span-3 row-span-4 col-start-4 row-start-3">
                <img src={camisa2} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>

              <div ref={img3Ref} className="col-span-3 row-span-4 col-start-1 row-start-7">
                <img src={camisa3} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>

              <div ref={img4Ref} className="col-span-3 row-span-4 col-start-4 row-start-9">
                <img src={camisa4} alt="" className="w-full h-full object-cover rounded-lg"/>
              </div>

            </div>
          </div>
        </div>

        <div className="h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-full mt-16">
            <div 
              ref={bottomH2Ref}
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-light text-white tracking-wide mb-8 px-2">
                Wear clothes with perspective
              </h2>
            </div>
            <div 
              ref={bottomLineRef}
              className="w-16 sm:w-24 md:w-32 h-px bg-white/60 mx-auto mb-6"
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
            </div>
            <div 
              ref={bottomPRef}
              style={{ clipPath: 'inset(100% 0 0 0)' }}
            >
              <p className="text-white/70 text-base sm:text-lg max-w-xs sm:max-w-md mx-auto leading-relaxed px-4">
                Experience fashion through a new lens. Where boundaries dissolve and creativity takes flight.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Novelty;