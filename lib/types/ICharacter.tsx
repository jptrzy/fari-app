export type ICharacter = {
  _id: string;
  _rev: string;
  game: string;
  name?: string;
  description?: string;
  aspect1?: string;
  aspect2?: string;
  aspect3?: string;
  aspect4?: string;
  aspect5?: string;
} & (IFateAcceleratedCharacter | IFateCoreCharacter);

type IFateAcceleratedCharacter = {
  careful?: string;
  clever?: string;
  aspect3?: string;
  forceful?: string;
  flashy?: string;
  quick?: string;
  sneaky?: string;
};

type IFateCoreCharacter = {
  skillSuperb?: string;
  skillGreat?: string;
  skillGood?: string;
  skillFair?: string;
  skillAverage?: string;
};
