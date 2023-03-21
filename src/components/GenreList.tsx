import {
  List,
  ListIcon,
  HStack,
  Image,
  Text,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import useGenres, { Genre } from "../hooks/useGenres";
import getCroppedImageUrl from "../services/imageUrl";

const GenreList = () => {
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
            <Text fontSize={"lg"}>{genre.name}</Text>
          </HStack>
        </ListItem>
      ))}
    </List>
  );
};

export default GenreList;
