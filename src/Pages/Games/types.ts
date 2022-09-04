import { AllDifficulties } from "models/models"

export const DifficultyData = {
  "A1": 0,
  "A2": 1,
  "B1": 2,
  "B2": 3,
  "C1": 4,
  "C2": 5,
  "HARD": 6
}

export interface ILevel {
  key: string,
  level: AllDifficulties,
  levelDescription: string,
  color: string
}


export type UserData = {
  token: string;
  id: string;
};

export const wordsToFill = [
  'огонь',
  'задание',
  'чувство',
  'собрание',
  'добро',
  'вода',
  'закат',
  'стул',
  'футболка',
  'последний',
  'камень',
  'грибы',
  'бровь',
  'луна',
  'стена',
  'состояние',
  'артефакт',
  'анатомия',
  'ноутбук'
];
