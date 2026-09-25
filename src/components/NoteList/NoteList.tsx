import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./NoteList.module.css";
import { deleteNote, fetchNotes } from "../../services/noteService";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ErrorView from "../ErrorView/ErrorView";

interface NoteListProps {
  page: number;
  search: string;
  onTotalPagesChange: (total: number) => void;
}

export default function NoteList({
  page,
  search,
  onTotalPagesChange,
}: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search }],
    queryFn: () => fetchNotes({ page, search }),
  });

  useEffect(() => {
    if (data?.totalPages !== undefined) {
      onTotalPagesChange(data.totalPages);
    }
  }, [data?.totalPages, onTotalPagesChange]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <ErrorView message="Failed to load notes. Please try again later." />
    );
  }

  const notes = data?.notes || [];

  if (notes.length === 0) {
    return search.trim() !== "" ? (
      <ErrorView message="No notes found matching your search." />
    ) : (
      <ErrorView message="Your note collection is empty. Create your first note!" />
    );
  }

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li className={styles.listItem} key={note.id}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button
              className={styles.button}
              onClick={() => {
                deleteMutation.mutate(note.id);
              }}
              disabled={deleteMutation.isPending}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
