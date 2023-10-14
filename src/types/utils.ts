export const CategoryType = {
  Workout: 'Workout',
  Birthday: 'Birthday',
  Brainstorm: 'Brainstorm',
} as const;
export interface ICategory {
  color: string;
  type: typeof CategoryType;
}

export interface IEvent {
  category: ICategory | null;
  date: string | Date;
  name: string;
  note: string;
  shouldRemindMe: boolean;
  id?: string;
}
