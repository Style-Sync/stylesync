import * as Icons from "./icons/index";

export const iconRegistry = {
  copy: Icons.Copy,
  download: Icons.Download,
  share: Icons.Share,

  google: Icons.Google,
  instagram: Icons.Instagram,
  lightning: Icons.Lightning,
  mention: Icons.Mention,
  user: Icons.User,
  checkCircle: Icons.CheckCircle,
  globe: Icons.Globe,

  music: Icons.Music,
  play: Icons.Play,
  plus: Icons.Plus,
  reload: Icons.Reload,
  search: Icons.Search,
  arrowLeft: Icons.ArrowLeft,
  arrowRight: Icons.ArrowRight,
  arrowUpRight: Icons.ArrowUpRight,
  bigArrowRight: Icons.BigArrowRight,
  check: Icons.Check,
  close: Icons.Close,
  hanger: Icons.Hanger,
  movie: Icons.Movie,
} as const;

export type IconName = keyof typeof iconRegistry;
