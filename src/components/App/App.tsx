import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Pagination from "../Pagination/Pagination";

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* Компонент SearchBox */}
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        {/* Кнопка створення нотатки */}
      </header>
      <NoteList page={page} onTotalPagesChange={setTotalPages} />
    </div>
  );
}
