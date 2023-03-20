import { Badge } from "@chakra-ui/react";
import React from "react";

interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "red";
  return (
    <Badge
      fontSize={"1rem"}
      paddingX={2}
      borderRadius={".25rem"}
      colorScheme={color}
    >
      {score}
    </Badge>
  );
};

export default CriticScore;
