import { motion } from 'framer-motion';
import { Users, Github, Linkedin, Mail, Globe, Award, Rocket } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { StarfieldBackground } from '@/components/StarfieldBackground';


const Team = () => {
  const teamMembers = [
    {
      name: "Md. Abdul Owadud Islam Raton",
      role: "Team Leader, Researcher",
      avatar: "IR",
      avatarImage: "image/ratoonvai.png",
      bio: "Leading the team with expertise in research and project management for space exploration applications.",
      expertise: ["Research", "Project Management", "Team Leadership"],
      social: {
        github: "https://github.com/RATON599",
        linkedin: "http://www.linkedin.com/in/abdul-owadud-raton-670183323",
        email: "imranraton599@gmail.com"
      }
    },
    {
      name: "Md. Abdullah Al Masum",
      role: "Data Scientist, Project Researcher",
      avatar: "AM",
      avatarImage: "image/masum.jpg",
      bio: "Specializes in data analysis and research for space exploration projects using advanced statistical methods.",
      expertise: ["Data Science", "Research", "Statistics"],
      social: {
        github: "https://github.com/Masum181",
        linkedin: "http://www.linkedin.com/in/md-abdullah-al-masum",
        email: "masummozumder12@gmail.com"
      }
    },
    {
      name: "Apu Chandra Das",
      role: "App & Web Developer",
      avatar: "AD",
      avatarImage: "image/apudas.jpg",
      bio: "Develops cutting-edge web and mobile applications for space exploration and data visualization.",
      expertise: ["Web Development", "Mobile Apps", "JavaScript"],
      social: {
        github: "https://github.com/apudas-github",
        linkedin: "https://www.linkedin.com/in/apu-chandra-das-83161932b/",
        email: "apudas.info.contact@gmail.com"
      }
    },
    {
      name: "Abu Noman Rakib",
      role: "UI/UX Designer & Video Editor",
      avatar: "AR",
      avatarImage: "image/rakib.png",
      bio: "Creates intuitive user interfaces and compelling visual content for space exploration applications.",
      expertise: ["UI/UX Design", "Video Editing", "Visual Design"],
      social: {
        github: "https://github.com/abunomanrakib",
        linkedin: "https://linkedin.com/in/abunomanrakib",
        email: "abunomanrakib130@gmail.com"
      }
    },
    {
      name: "Yeasin Arafat Dipu",
      role: "ML & Full Stack Developer",
      avatarImage: "image/dipu.png",
      avatar: "YD",
      bio: "Builds machine learning models and full-stack solutions for space exploration and data analysis.",
      expertise: ["Machine Learning", "Full Stack", "Python"],
      social: {
        github: "https://github.com/DipuHowlader",
        linkedin: "https://linkedin.com/in/yeasindipu",
        email: "yeasin.dipu@gmail.com"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-space relative">
      {/* Animated Starfield Background */}
      <StarfieldBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navigation 
          onSearch={() => {}}
          searchQuery=""
        />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-neon rounded-full mb-6 shadow-neon"
            >
              <Users className="h-10 w-10 text-primary-foreground" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-neon bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Meet Our Team
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Meet Team NewHorizon - the brilliant minds behind ExoAI. Our diverse team combines expertise 
              in data science, machine learning, web development, and UI/UX design to push the boundaries 
              of space exploration for the NASA International Space Apps Challenge.
            </motion.p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
              >
                {/* Member Header */}
                <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-neon rounded-full flex items-center justify-center shadow-neon overflow-hidden">
                  <img src={member.avatarImage}       // URL of the image
                       alt={member.name}              // accessible description
                       className="w-full h-full object-cover"
                   />
                </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium">{member.role}</p>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>

                {/* Expertise */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-2 text-primary" />
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-3">
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="p-2 text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20 text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-neon rounded-full mb-6 shadow-neon">
              <Rocket className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Team NewHorizon is dedicated to democratizing space exploration by making exoplanet discovery accessible to everyone. 
              Through our diverse expertise in data science, machine learning, web development, and design, we're building innovative tools 
              that bring the wonders of the universe to curious minds everywhere for the NASA International Space Apps Challenge.
            </p>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-16 pt-8 border-t border-primary/20 text-center"
          >
            <div className="flex items-center justify-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-neon rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-foreground"><img src="image/team_logo.png"     // URL of the image
                       alt="NH"          // accessible description
                       className="w-full h-full object-cover"
                   /></span>
                </div>
                <span className="text-sm text-muted-foreground">Team NewHorizon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white"><img src="image/logo_nasa.png"     // URL of the image
                       alt="NASA"          // accessible description
                       className="w-full h-full object-cover"
                   /></span>
                </div>
                <span className="text-sm text-muted-foreground">Space Apps Challenge 2024</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Built with React, Three.js, and of space exploration Dataset of Nasa
            </p>
          </motion.footer>
        </main>
      </div>
    </div>
  );
};

export default Team;
