import axios from "axios";

import type Note from "../types/note";
import type { NoteTag } from "../types/note";

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const noteApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    Accept: "application/json",
  },
});

interface FetchNotesParams {
  page?: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await noteApi.get<FetchNotesResponse>("", {
    params: {
      page,
      search,
    },
  });
  return response.data;
};

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async ({
  title,
  content,
  tag,
}: CreateNoteData): Promise<Note> => {
  const response = await noteApi.post<Note>("", { title, content, tag });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await noteApi.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
  );
  return response.data;
};
