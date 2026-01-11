import { useState, useEffect, useCallback } from 'react';
import { api, clearCache } from '../services/api';
import { projectsData } from '../data/projects';
import { skillsData } from '../data/skills';

/**
 * Custom hook to fetch portfolio data with static fallback
 * Implements progressive enhancement: loads static data first, then tries API
 */
export function usePortfolioData(dataType) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFromAPI, setIsFromAPI] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (skipCache = false) => {
      // Start with static data for immediate rendering
      let staticData = null;
      
      switch (dataType) {
        case 'projects':
          staticData = projectsData;
          break;
        case 'skills':
          staticData = skillsData;
          break;
        case 'about':
          staticData = {
            name: 'Mayank Rawat',
            title: 'Senior iOS Developer',
            description: `I'm a Senior iOS Developer with over 7 years of experience crafting high-performance 
mobile applications. I specialize in building scalable, user-centric iOS solutions 
that serve millions of users, with expertise in Swift, UIKit, SwiftUI, and modern iOS architectures.

Currently at Paytm since January 2020, I've developed key features for Homepage, Search, 
and Storefront modules. Prior to that, I worked at Samsung Research Institute (2017-2020), 
building the Universal Guide Module for the Smart Things App.

I'm passionate about writing clean, maintainable code and following iOS best practices. 
When I'm not coding, you can find me exploring new places and traveling.`,
            highlights: [
              { number: '7+', label: 'Years Experience' },
              { number: '2', label: 'Major Companies' },
            ],
            photo_url: '/photo.jpg',
          };
          break;
        case 'hero':
          staticData = {
            name: 'Mayank Rawat',
            subtitle: 'iOS Developer by Profession, Explorer by Passion',
            description: `Experienced iOS Developer with a track record of delivering polished, high-performance apps. 
Skilled in Swift and experienced with iOS frameworks such as UIKit, SwiftUI, and Foundation. 
I love to travel and explore new places.`,
          };
          break;
        case 'contact':
          staticData = {
            email: 'rawat.mayank1234@gmail.com',
            linkedin: 'linkedin.com/in/mayank-rawat-0585a010b',
            github: 'github.com/legen12345dairy',
            instagram: '_mayank_rawat',
            whatsapp: '9643764341',
            phone: '+91-9643764341',
            linkedin_url: 'https://www.linkedin.com/in/mayank-rawat-0585a010b/',
            github_url: 'https://github.com/legen12345dairy',
            instagram_url: 'https://www.instagram.com/_mayank_rawat',
            whatsapp_url: 'https://wa.me/919643764341',
          };
          break;
        default:
          staticData = null;
      }

      // Set static data immediately for fast initial render
      if (staticData && isMounted) {
        setData(staticData);
        setLoading(false);
      }

      // Try to fetch from API in the background
      try {
        // Clear cache if forced refresh
        if (skipCache) {
          clearCache(`/api/${dataType}`);
        }
        
        let apiData = null;
        
        switch (dataType) {
          case 'projects':
            apiData = await api.getProjects({ skipCache });
            // Transform API data to match frontend format
            if (apiData && Array.isArray(apiData)) {
              apiData = apiData.map(p => ({
                id: p.id,
                title: p.title,
                category: p.category,
                description: p.description,
                technologies: p.technologies,
                githubUrl: p.github_url || '',
                liveUrl: p.live_url || '',
              }));
            }
            break;
          case 'skills':
            apiData = await api.getSkills({ skipCache });
            // Transform API data to match frontend format
            if (apiData && Array.isArray(apiData)) {
              // Group skills by category
              const grouped = {};
              apiData.forEach(skill => {
                if (!grouped[skill.category]) {
                  grouped[skill.category] = {
                    category: skill.category,
                    icon: skill.icon,
                    skills: [],
                  };
                }
                grouped[skill.category].skills.push({
                  name: skill.skill_name,
                  level: skill.level,
                });
              });
              apiData = Object.values(grouped);
            }
            break;
          case 'about':
            apiData = await api.getAbout({ skipCache });
            break;
          case 'hero':
            apiData = await api.getHero({ skipCache });
            break;
          case 'contact':
            apiData = await api.getContact({ skipCache });
            break;
          default:
            apiData = null;
        }

        // Update with API data if available
        if (apiData && isMounted) {
          setData(apiData);
          setIsFromAPI(true);
        }
      } catch (err) {
        // Silently fail - we already have static data
        if (isMounted) {
          setError(err.message);
          console.warn(`Failed to fetch ${dataType} from API, using static data:`, err.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dataType]);

  // Function to manually refresh data
  const refresh = useCallback(() => {
    clearCache(`/api/${dataType}`);
    // Trigger re-fetch by updating a dependency
    setLoading(true);
    // Re-run the effect by changing dataType temporarily (but we'll use a different approach)
    // Actually, let's just clear cache and refetch manually
    const refetch = async () => {
      try {
        let apiData = null;
        switch (dataType) {
          case 'projects':
            apiData = await api.getProjects({ skipCache: true });
            if (apiData && Array.isArray(apiData)) {
              apiData = apiData.map(p => ({
                id: p.id,
                title: p.title,
                category: p.category,
                description: p.description,
                technologies: p.technologies,
                githubUrl: p.github_url || '',
                liveUrl: p.live_url || '',
              }));
            }
            break;
          case 'skills':
            apiData = await api.getSkills({ skipCache: true });
            if (apiData && Array.isArray(apiData)) {
              const grouped = {};
              apiData.forEach(skill => {
                if (!grouped[skill.category]) {
                  grouped[skill.category] = {
                    category: skill.category,
                    icon: skill.icon,
                    skills: [],
                  };
                }
                grouped[skill.category].skills.push({
                  name: skill.skill_name,
                  level: skill.level,
                });
              });
              apiData = Object.values(grouped);
            }
            break;
          case 'about':
            apiData = await api.getAbout({ skipCache: true });
            break;
          case 'hero':
            apiData = await api.getHero({ skipCache: true });
            break;
          case 'contact':
            apiData = await api.getContact({ skipCache: true });
            break;
        }
        if (apiData) {
          setData(apiData);
          setIsFromAPI(true);
        }
      } catch (err) {
        console.warn(`Failed to refresh ${dataType}:`, err.message);
      }
    };
    refetch();
  }, [dataType]);

  return { data, loading, error, isFromAPI, refresh };
}

