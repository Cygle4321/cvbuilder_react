import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

type SortableItemProps = {
  id: string;
  title: string;
  subtitle: string;
  onDelete: (id: string) => void;
};

export function SortableItem(props: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 bg-base-100 rounded-lg shadow-sm border border-base-300 mb-2">
      <div {...attributes} {...listeners} className="cursor-grab hover:text-primary">
        <GripVertical className="w-5" />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <span className="font-bold truncate">{props.title}</span>
        <span className="text-sm truncate opacity-70">{props.subtitle}</span>
      </div>
      <button onClick={() => props.onDelete(props.id)} className="btn btn-ghost btn-sm text-error">
        <Trash2 className="w-4" />
      </button>
    </div>
  );
}
