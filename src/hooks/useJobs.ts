"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "@/lib/api";

export type Job = {
  id?: string;
  remotive_id?: string;
  title: string;
  company?: string;
  company_name?: string;
  category?: string;
  job_type?: string;
  location?: string;
  url?: string;
  published_at?: string;
  created_at?: string;
  is_favorite?: boolean;
  tags?: string[];
};

export type JobsResponse = {
  items: Job[];
  page: number;
  total_pages: number;
  total: number;
};

type Params = {
  q?: string;
  category?: string;
  page?: number;
};

export function useJobs({ q = "", category = "", page = 1 }: Params) {
  return useQuery<JobsResponse, Error>({
    queryKey: ["jobs", { q, category, page }],
    queryFn: async () => {
      const { data } = await api.get<JobsResponse>("/jobs", {
        params: { q, category, page },
      });
      return data;
    },
    placeholderData: keepPreviousData, 
    staleTime: 30_000,
  });
}
