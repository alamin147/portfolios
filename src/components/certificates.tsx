import {
  Award,
  Calendar,
  ExternalLink,
  CheckCircle,
  Trophy,
  Code,
  Database,
  Server,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import SectionTitle from "./section-title";
import { useState } from "react";

const certificatesData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "Meta",
    platform: "Coursera",
    date: "2024",
    credentialId: "ABC123DEF456",
    image: "/certificates/meta-fullstack.jpg", // Add your certificate images to public folder
    skills: ["React", "Node.js", "Django", "Bootstrap"],
    description: "Comprehensive program covering front-end and back-end web development with modern frameworks and best practices.",
    verificationUrl: "https://coursera.org/verify/ABC123DEF456",
    icon: <Code size={24} />,
    color: "from-sky-500/20 to-emerald-500/20",
    borderColor: "border-sky-500/30",
    verified: true,
  },
  {
    id: 2,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    platform: "freeCodeCamp",
    date: "2023",
    credentialId: "XYZ789ABC123",
    image: "/certificates/freecodecamp-js.jpg",
    skills: ["JavaScript", "ES6+", "Algorithms", "Data Structures"],
    description: "Advanced JavaScript programming with focus on algorithms, data structures, and functional programming concepts.",
    verificationUrl: "https://freecodecamp.org/certification/username/javascript-algorithms-and-data-structures",
    icon: <Trophy size={24} />,
    color: "from-emerald-500/20 to-sky-500/20",
    borderColor: "border-emerald-500/30",
    verified: true,
  },
  {
    id: 3,
    title: "Database Design and Management",
    issuer: "IBM",
    platform: "edX",
    date: "2023",
    credentialId: "IBM456DEF789",
    image: "/certificates/ibm-database.jpg",
    skills: ["SQL", "PostgreSQL", "Database Design", "NoSQL"],
    description: "Comprehensive database design, optimization, and management with both relational and NoSQL databases.",
    verificationUrl: "https://edx.org/certificates/IBM456DEF789",
    icon: <Database size={24} />,
    color: "from-purple-500/20 to-sky-500/20",
    borderColor: "border-purple-500/30",
    verified: true,
  },
  {
    id: 4,
    title: "Cloud Computing Fundamentals",
    issuer: "Amazon Web Services",
    platform: "AWS Training",
    date: "2024",
    credentialId: "AWS123GHI456",
    image: "/certificates/aws-cloud.jpg",
    skills: ["AWS", "Cloud Architecture", "EC2", "S3"],
    description: "Foundation in cloud computing concepts, AWS services, and cloud architecture best practices.",
    verificationUrl: "https://aws.amazon.com/verification/AWS123GHI456",
    icon: <Server size={24} />,
    color: "from-orange-500/20 to-emerald-500/20",
    borderColor: "border-orange-500/30",
    verified: true,
  },
];

export default function Certificates() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: certificatesRef, isVisible: certificatesVisible } = useScrollAnimation();
  const [selectedCertificate, setSelectedCertificate] = useState<number | null>(null);

  return (
    <section id="certificates" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <div
          ref={headerRef as any}
          className={`text-center mb-16 transition-all duration-1000 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <SectionTitle
            title="Certificates"
            desc="Professional certifications and achievements that validate my expertise in modern web development and software engineering."
          />
        </div>

        {/* Certificates Grid */}
        <div
          ref={certificatesRef as any}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${
            certificatesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {certificatesData.map((cert, index) => (
            <div
              key={cert.id}
              className={`glass-card hover:glass-card-hover rounded-2xl p-6 transition-all duration-500 hover:scale-105 cursor-pointer group ${cert.borderColor} border ${
                selectedCertificate === cert.id ? "ring-2 ring-sky-500/50" : ""
              }`}
              onClick={() => setSelectedCertificate(selectedCertificate === cert.id ? null : cert.id)}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Certificate Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${cert.color} backdrop-blur-sm`}>
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors duration-300">
                      {cert.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{cert.issuer} • {cert.platform}</p>
                  </div>
                </div>
                {cert.verified && (
                  <div className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle size={16} />
                    <span className="text-xs">Certificate</span>
                  </div>
                )}
              </div>

              {/* Certificate Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-300 text-sm">
                  <Calendar size={16} />
                  <span>Completed in {cert.date}</span>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-xs border border-sky-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Expanded Details */}
                {selectedCertificate === cert.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3 animate-in slide-in-from-top duration-300">
                    <div className="text-sm text-gray-400">
                      <strong>Credential ID:</strong> {cert.credentialId}
                    </div>

                    {/* Verification Link */}
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/20 to-emerald-500/20 hover:from-sky-500/30 hover:to-emerald-500/30 text-white rounded-lg transition-all duration-300 hover:scale-105 border border-sky-500/30"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      <span>Verify Certificate</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Hover Effect Indicator */}
              <div className="mt-4 flex justify-center">
                <div className={`w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-500 rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="text-sky-400" size={32} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Continuous Learning
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              I believe in continuous learning and staying updated with the latest technologies.
              These certifications represent my commitment to professional development and mastery of cutting-edge tools and frameworks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
