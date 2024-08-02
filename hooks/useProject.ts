// hooks/useProjects.ts
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

interface File {
  id: string;
  name: string;
  language: string;
  file_icon: string;
}

interface Project {
  id: string;
  name: string;
  files: File[];
}

export function useProjects() {
  const { getToken } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const token = await getToken();
        const response = await fetch("/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [getToken]);

  return { projects, loading, error };
}
