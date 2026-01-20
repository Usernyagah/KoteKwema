import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  images: string[];
  // Re-used numeric fields for Facts & Figures (keeps backwards compat with existing data)
  price?: number; // appointment year
  bedrooms?: number; // completion year
  area?: number; // area m2
  bathrooms?: number; // capacity
  team?: string[];
  consultants?: string[];
  createdAt?: any;
}

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!db) {
        setError("Firebase is not configured");
        setIsLoading(false);
        return;
      }
      if (!id) {
        setError("Missing project id");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const snap = await getDoc(doc(db, "properties", id));
        if (!snap.exists()) {
          setError("Project not found");
          return;
        }
        const data = snap.data() as any;
        const loaded: Project = {
          id: snap.id,
          title: data.title ?? "",
          description: data.description ?? "",
          category: data.category ?? "",
          location: data.location ?? "",
          images: Array.isArray(data.images) ? data.images : [],
          price: typeof data.price === "number" ? data.price : undefined,
          bedrooms: typeof data.bedrooms === "number" ? data.bedrooms : undefined,
          bathrooms: typeof data.bathrooms === "number" ? data.bathrooms : undefined,
          area: typeof data.area === "number" ? data.area : undefined,
          team: Array.isArray(data.team) ? data.team : undefined,
          consultants: Array.isArray(data.consultants) ? data.consultants : undefined,
          createdAt: data.createdAt,
        };
        if (!cancelled) setProject(loaded);
      } catch (e) {
        if (!cancelled) setError("Failed to load project");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const images = useMemo(() => project?.images ?? [], [project]);

  useEffect(() => {
    setSlideIndex(0);
  }, [id]);

  // SEO
  useSEO({
    title: project?.title ? `Projects | ${project.title}` : "Projects",
    description: project?.description?.slice(0, 160) || "Project details",
    url: `${window.location.origin}${location.pathname}`,
  });

  const canGoPrev = images.length > 1;
  const canGoNext = images.length > 1;

  const goPrev = () => {
    if (!canGoPrev) return;
    setSlideIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const goNext = () => {
    if (!canGoNext) return;
    setSlideIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation variant="white" />

      <main className="pt-20 md:pt-24 px-4 md:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs md:text-sm text-[#4A4A4A] font-light mb-6">
            <button
              type="button"
              className="hover:underline"
              onClick={() => navigate("/projects/all")}
            >
              Projects
            </button>
            <span className="mx-2">/</span>
            <span className="text-black font-normal">{project?.title ?? "Project"}</span>
          </div>

          {isLoading ? (
            <div className="py-16 text-center text-muted-foreground">Loading…</div>
          ) : error ? (
            <div className="py-16 text-center text-destructive">{error}</div>
          ) : !project ? (
            <div className="py-16 text-center text-muted-foreground">Project not found.</div>
          ) : (
            <div className="space-y-10 pb-16">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-5xl font-light text-black tracking-tight">
                  {project.title}
                </h1>
                <p className="text-sm text-[#666666]">
                  {project.location}
                  {project.category ? (
                    <>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{project.category.replace("-", " ")}</span>
                    </>
                  ) : null}
                </p>
              </div>

              {/* Image slider */}
              {images.length > 0 && (
                <div className="space-y-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={images[slideIndex]}
                      alt={`${project.title} - Slide ${slideIndex + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/1200x675?text=No+Image";
                      }}
                    />

                    {images.length > 1 && (
                      <>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                          onClick={goPrev}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                          onClick={goNext}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="text-sm text-[#666666]">
                    Slide {Math.min(slideIndex + 1, images.length)} of {images.length}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-medium text-black">Overview</h2>
                <div className="text-base text-[#4A4A4A] font-light leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>

              {/* Facts & Figures + Team + Consultants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-medium text-black">Facts and Figures</h2>
                  <div className="space-y-3 text-sm">
                    {typeof project.price === "number" && (
                      <div>
                        <div className="text-[#666666]">Appointment Year</div>
                        <div className="text-black font-medium">{project.price}</div>
                      </div>
                    )}
                    {typeof project.bedrooms === "number" && (
                      <div>
                        <div className="text-[#666666]">Completion Year</div>
                        <div className="text-black font-medium">{project.bedrooms}</div>
                      </div>
                    )}
                    {typeof project.area === "number" && (
                      <div>
                        <div className="text-[#666666]">Area</div>
                        <div className="text-black font-medium">
                          {project.area.toLocaleString()} m²
                        </div>
                      </div>
                    )}
                    {typeof project.bathrooms === "number" && (
                      <div>
                        <div className="text-[#666666]">Capacity</div>
                        <div className="text-black font-medium">
                          {project.bathrooms.toLocaleString()}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  {project.team?.length ? (
                    <div className="space-y-3">
                      <h2 className="text-xl md:text-2xl font-medium text-black">Team</h2>
                      <ul className="space-y-1 text-sm text-[#4A4A4A] font-light">
                        {project.team.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {project.consultants?.length ? (
                    <div className="space-y-3">
                      <h2 className="text-xl md:text-2xl font-medium text-black">Consultants</h2>
                      <ul className="space-y-1 text-sm text-[#4A4A4A] font-light">
                        {project.consultants.map((name, idx) => (
                          <li key={idx}>{name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}


