import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { errorText, input, titleOne } from "../../asserts/globalStyles";
import { getCoordinates } from "../../services/api";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import styles from "./header.module.scss";

const Header = () => {
  const [cityName, setCityName] = useState<string>("");
  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cityName) {
      setIsInputEmpty(true);
    } else {
      dispatch(getCoordinates(cityName));
      setCityName("");
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
    if (!event.target.value) {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
  };

  return (
    <Box>
      <Flex
        className={styles.header__wrapper}
        justifyContent="space-between"
        align={"center"}
        pt={"50px"}
      >
        <Heading
          as={"h1"}
          className={styles.header__title}
          css={{ ...titleOne }}
        >
          WeatherApp
        </Heading>
        <form
          className={styles.header__form}
          onSubmit={handleSubmit}
          aria-label={"Form for searching city"}
        >
          <Flex align={"center"}>
            <Input
              variant={"outline"}
              mr={"20px"}
              placeholder={"Enter city name"}
              borderColor={isInputEmpty ? "red.500" : "white"}
              css={{ ...input }}
              type={"text"}
              value={cityName}
              onChange={(event) => handleChange(event)}
              onBlur={() => setIsInputEmpty(false)}
            />
            <Button
              type={"submit"}
              background={"white"}
              width={"55px"}
              height={"55px"}
              borderRadius={"50%"}
            >
              <Image
                objectFit={"contain"}
                width={"55px"}
                height={"30px"}
                src={"/images/search.svg"}
                alt={"search"}
              />
            </Button>
          </Flex>
          {isInputEmpty ? (
            <Text css={{ ...errorText }}>City name required</Text>
          ) : null}
        </form>
      </Flex>
    </Box>
  );
};

export default Header;
