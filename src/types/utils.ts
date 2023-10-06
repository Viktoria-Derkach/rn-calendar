export const CategoryType = {
  Workout: 'Workout',
  Birthday: 'Birthday',
  Brainstorm: 'Brainstorm',
};
export interface ICategory {
  color: string;
  type: CategoryType;
}
