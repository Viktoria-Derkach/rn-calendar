export enum CategoryType {
  Workout = 'Workout',
  Birthday = 'Birthday',
  Brainstorm = 'Brainstorm',
}
export interface ICategory {
  color: string;
  type: CategoryType;
}

export interface IEvent {
  category: ICategory | null;
  date: string | Date;
  name: string;
  note: string;
  shouldRemindMe: boolean;
  id?: string;
}
