import {
  List,
  ListIcon,
  HStack,
  Image,
  Text,
  ListItem,
  Spinner,
  Button,
} from "@chakra-ui/react";
import React from "react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/imageUrl";

interface Props {
  onSelectGenre: (genre: Genre) => void;
}

const GenreList = ({ onSelectGenre }: Props) => {
  const { data, isLoading } = useGenres();
  return isLoading ? (
    <Spinner />
  ) : (
    <List>
      {data.map((genre) => (
        <ListItem key={genre.id} paddingY={"0.3125rem"}>
          <HStack>
            <Image
              boxSize={"2rem"}
              src={getCroppedImageUrl(genre.image_background)}
              borderRadius={8}
            />
            <Button
              fontSize={"lg"}
              variant="link"
              onClick={() => onSelectGenre(genre)}
            >
              {genre.name}
            </Button>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
