import {
  ClipboardList,
  CodeXml,
  Crosshair,
  Disc3,
  Dices,
  Network,
  ShipWheel,
  Trophy,
  Tv,
} from "lucide-react";
import CricketStrokeIcon from "../components/icons/CricketStrokeIcon.jsx";

/**
 * Maps the `iconName` string stored in MongoDB to a React component.
 * Add new icons here whenever the admin starts using one in the DB.
 */
const registry = {
  ShipWheel,
  Trophy,
  Dices,
  ClipboardList,
  Crosshair,
  CodeXml,
  Disc3,
  Network,
  Tv,
  CricketStrokeIcon,
};

export function getIcon(name) {
  return registry[name] ?? ShipWheel;
}

export default registry;
