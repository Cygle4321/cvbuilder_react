import { Experience } from "@/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from "./SortableItem";

type Props = {
    experience: Experience[];
    setExperience: (experience: Experience[]) => void
}

const ExperienceForm: React.FC<Props> = ({ experience, setExperience }) => {
    const [newExperience, setNewExperience] = useState<Experience>({
        id: '',
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        description: '',
    })

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Experience) => {
        setNewExperience({ ...newExperience, [field]: e.target.value })
    }

    const handleAddExperience = () => {
        const newExp = { ...newExperience, id: Date.now().toString() };
        setExperience([...experience, newExp]);
        setNewExperience({
            id: '',
            jobTitle: '',
            companyName: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    }

    const handleDelete = (id: string) => {
        setExperience(experience.filter(exp => exp.id !== id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = experience.findIndex((item) => item.id === active.id);
            const newIndex = experience.findIndex((item) => item.id === over.id);
            setExperience(arrayMove(experience, oldIndex, newIndex));
        }
    };

    return (
        <div>
            {experience.length > 0 && (
                <div className="mb-4">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={experience.map(e => e.id || '')} strategy={verticalListSortingStrategy}>
                            {experience.map((exp, index) => (
                                <SortableItem 
                                    key={exp.id || index.toString()} 
                                    id={exp.id || index.toString()} 
                                    title={exp.jobTitle} 
                                    subtitle={exp.companyName} 
                                    onDelete={handleDelete} 
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            )}

            <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                    <input
                        type="text"
                        placeholder="Intitulé du poste"
                        value={newExperience.jobTitle}
                        onChange={(e) => handleChange(e, 'jobTitle')}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="text"
                        placeholder="Nom de l'entreprise"
                        value={newExperience.companyName}
                        onChange={(e) => handleChange(e, 'companyName')}
                        className="input input-bordered w-full ml-4"
                    />
                </div>

                <div className="flex justify-between">
                    <input
                        type="text"
                        placeholder="Date de début"
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }
                        }
                        value={newExperience.startDate}
                        onChange={(e) => handleChange(e, 'startDate')}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="text"
                        placeholder="Date de fin"
                        onFocus={(e) => e.target.type = 'date'}
                        onBlur={(e) => {
                            if (!e.target.value) e.target.type = "text"
                        }
                        }
                        value={newExperience.endDate}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className="input input-bordered w-full ml-4"
                    />

                </div>
                <textarea
                    placeholder="Description du poste"
                    value={newExperience.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className="input input-bordered w-full"
                >
                </textarea>
            </div>

            <button
                onClick={handleAddExperience}
                className="btn btn-primary mt-4 rounded-full"
            >
                Ajouter
                <Plus className="w-4" />
            </button>
        </div>
    )
}
export default ExperienceForm;