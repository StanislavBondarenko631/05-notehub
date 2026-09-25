import { useQuery } from "@tanstack/react-query";
import styles from "./NoteList.module.css";
import { fetchNotes } from "../../services/noteService";
import { useEffect } from "react";

interface NoteListProps {
  page: number;
  onTotalPagesChange: (total: number) => void;
}

export default function NoteList({ page, onTotalPagesChange }: NoteListProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search: "" }],
    queryFn: () => fetchNotes({ page, search: "" }),
  });

  useEffect(() => {
    if (data?.totalPages !== undefined) {
      onTotalPagesChange(data.totalPages);
    }
  }, [data?.totalPages, onTotalPagesChange]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading notes</div>;
  }

  const notes = data?.notes || [];

  if (notes.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li className={styles.listItem} key={note.id}>
          <h2 className={styles.title}>{note.title}</h2>
          <p className={styles.content}>{note.content}</p>
          <div className={styles.footer}>
            <span className={styles.tag}>{note.tag}</span>
            <button className={styles.button}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
