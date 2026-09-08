import { Education } from "@/type";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableItem } from "./SortableItem";

type Props = {
    educations: Education[];
    setEducations: (educations: Education[]) => void
}

const EducationForm: React.FC<Props> = ({ educations, setEducations }) => {
    const [newEducation, setNewEducation] = useState<Education>({
        id: '',
        school: '',
        degree: '',
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
        field: keyof Education) => {
        setNewEducation({ ...newEducation, [field]: e.target.value })
    }

    const handleAddEducation = () => {
        const newEdu = { ...newEducation, id: Date.now().toString() };
        setEducations([...educations, newEdu]);
        setNewEducation({
            id: '',
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    }

    const handleDelete = (id: string) => {
        setEducations(educations.filter(edu => edu.id !== id));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = educations.findIndex((item) => item.id === active.id);
            const newIndex = educations.findIndex((item) => item.id === over.id);
            setEducations(arrayMove(educations, oldIndex, newIndex));
        }
    };

    return (
        <div>
            {educations.length > 0 && (
                <div className="mb-4">
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={educations.map(e => e.id || '')} strategy={verticalListSortingStrategy}>
                            {educations.map((edu, index) => (
                                <SortableItem 
                                    key={edu.id || index.toString()} 
                                    id={edu.id || index.toString()} 
                                    title={edu.degree} 
                                    subtitle={edu.school} 
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
                        placeholder="Nom de l'école"
                        value={newEducation.school}
                        onChange={(e) => handleChange(e, 'school')}
                        className="input input-bordered w-full"
                    />

                    <input
                        type="text"
                        placeholder="Diplôme"
                        value={newEducation.degree}
                        onChange={(e) => handleChange(e, 'degree')}
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
                        value={newEducation.startDate}
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
                        value={newEducation.endDate}
                        onChange={(e) => handleChange(e, 'endDate')}
                        className="input input-bordered w-full ml-4"
                    />

                </div>
                <textarea
                    placeholder="Description du diplôme"
                    value={newEducation.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className="input input-bordered w-full"
                >
                </textarea>
            </div>

            <button
                onClick={handleAddEducation}
                className="btn btn-primary mt-4 rounded-full"
            >
                Ajouter
                <Plus className="w-4" />
            </button>
        </div>
    )
}
export default EducationForm;