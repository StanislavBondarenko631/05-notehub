import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "../SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Loader from "../Loader/Loader";
import ErrorView from "../ErrorView/ErrorView";

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { page, search }],
    queryFn: () => fetchNotes({ page, search }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;

  const handleSearchChange = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <button
          type="button"
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && (
        <ErrorView message="Failed to load notes. Please try again later." />
      )}

      {!isLoading && !isError && (
        <>
          {/* Если заметки есть — рендерим список и передаем их в пропс notes */}
          {(data?.notes || []).length > 0 ? (
            <NoteList notes={data?.notes || []} />
          ) : (
            /* Если заметок нет — показываем сообщение в зависимости от того, активен ли поиск */
            <ErrorView
              message={
                search.trim() !== ""
                  ? "No notes found matching your search."
                  : "Your note collection is empty. Create your first note!"
              }
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
