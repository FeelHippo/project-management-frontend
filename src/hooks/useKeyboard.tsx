import { RowModel } from '@tanstack/react-table';
import { useEffect, useRef, useState } from 'react';
import { Project } from '@/lib/interfaces/project';
import { mutationDetails } from '@/mutations/projects';

export default function useKeyboardMode(rowModel: RowModel<Project>) {
  const showDetailsOfProject = mutationDetails();
  const [keyboardEnabled, setKeyboardEnabled] = useState(true);
  const rowRefs = useRef<(HTMLTableRowElement | null)[]>([]);

  const keyboardSelectionIdxRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!keyboardEnabled) {
        return;
      }
      const { key } = event;
      const totalRows = rowRefs.current.length;
      const prevIdx = keyboardSelectionIdxRef.current;
      let nextIdx = prevIdx;

      if (key === 'ArrowDown') nextIdx = Math.min(prevIdx + 1, totalRows - 1);
      if (key === 'ArrowUp') nextIdx = Math.max(prevIdx - 1, 0);
      if (key === ' ') {
        rowModel.rows[keyboardSelectionIdxRef.current].toggleSelected();
      }
      if (key === 'Enter') {
        const uid = rowModel.rows[keyboardSelectionIdxRef.current].original.uid;
        showDetailsOfProject.mutate(uid);
      }
      if (key === '/') {
        const formSearch = document.getElementById('formSearch');
        if (formSearch instanceof HTMLElement) {
          formSearch!.focus();
        }
      }

      if (nextIdx !== prevIdx) {
        rowRefs.current[prevIdx]?.classList.remove('bg-blue-100');
        rowRefs.current[nextIdx]?.classList.add('bg-blue-100');
        rowRefs.current[nextIdx]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        keyboardSelectionIdxRef.current = nextIdx;
      }
    };

    // select the first item by default
    rowRefs.current[0]?.classList.add('bg-blue-100');
    keyboardSelectionIdxRef.current = 0;
    // attach listener to DOM
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardEnabled, rowModel.rows]);

  return {
    keyboardEnabled,
    setKeyboardEnabled,
    rowRefs,
    keyboardSelectionIdxRef,
  };
}
