"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Job } from "@/types/job";

/**
 * Lista favoritos do backend.
 * Aceita dois formatos de resposta:
 *   - Job[]
 *   - { items: Job[] }
 */
export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data } = await api.get<Job[] | { items?: Job[] }>("/favorites");
      const items = Array.isArray(data) ? data : data.items ?? [];
      return items as Job[];
    },
    staleTime: 30_000,
  });
}

/**
 * Alterna favorito de uma vaga.
 * Endpoint esperado: POST /api/favorites/:jobId/toggle
 */
export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const { data } = await api.post(`/favorites/${encodeURIComponent(jobId)}/toggle`);
      return data as { is_favorite: boolean };
    },
    onSuccess: () => {
      // Recarrega listas afetadas
      qc.invalidateQueries({ queryKey: ["favorites"] });
      qc.invalidateQueries({ queryKey: ["jobs"] });
    },
  });
}
