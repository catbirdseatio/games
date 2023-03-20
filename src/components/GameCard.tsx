import React from "react";
import { Card, CardBody } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Heading } from "@chakra-ui/layout";
import { Game } from "../hooks/useGames";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <Image src={game.background_image} />
      <CardBody>
        <Heading fontSize="2xl">{game.name}</Heading>
      </CardBody>
    </Card>
  );
};

export default GameCard;
