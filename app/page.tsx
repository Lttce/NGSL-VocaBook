"use client";

import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Skeleton,
  Spacer,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import {
  useEffect,
  useState
} from 'react';

import data from "@/data/ngsl.json";

import Topbar from "./_components/topbar";

function rangedRand(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function createArray(arrayLength: number, pIdx: number, max: number) {
  const set = new Set<number>();
  set.add(pIdx); // pIdxを確実に含む

  while (set.size < arrayLength) {
    const randomNumber = rangedRand(0, max);
    if (!set.has(randomNumber)) {
      set.add(randomNumber);
    }
  }
  return [...set];
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // 要素の入れ替え
  }
  return array;
}

function generateProblem() {
  let pIdx = rangedRand(0, data.length);

  let selections = shuffleArray(createArray(4, pIdx, data.length)).map(
    (i) => data[i]['japanese']
  );

  return {
    question: data[pIdx]['lemma'],
    answer: data[pIdx]['japanese'],
    selections: selections,
  };
}

type Problem = {
  question: string,
  answer: string,
  selections: string[]
}

const Ngsl = () => {
  const [problem, setProblem] = useState<Problem>({ question: "", answer: "", selections: [""] });
  const [hasPressedSelection, setHasPressedSelection] = useState(false);
  const [collect, setCollect] = useState(false);

  useEffect(() => {
    setProblem(generateProblem());
  }, []);

  const Problem = () => {
    return (
      <Box>
        <Skeleton isLoaded={problem.question != ""}>
          <Text fontSize="2xl" as="b">
            {problem.question}
          </Text>
          <Text fontSize="sm">以下から意味を選択してください。</Text>
        </Skeleton>
      </Box>
    );
  };

  const Choices = () => {
    const handleChoice = (e: any) => {
      setHasPressedSelection(true);
      setCollect(e.target.value == problem.answer);
    };

    return (
      <ButtonGroup onClick={handleChoice} display="block">
        <SimpleGrid columns={{base: 1, sm: 2}} spacing={2}>
          {problem.selections.map((s, i) => {
            return <Button key={i} value={s}>{s}</Button>;
          })}
        </SimpleGrid>
      </ButtonGroup>
    );
  };

  const PageChanger = () => {
    const handleNextPrev = () => {
      setHasPressedSelection(false);
      setProblem(generateProblem);
    };
    return (
      <Flex>
        <Spacer />
        <Button colorScheme="teal" onClick={handleNextPrev}>
          <ChevronRightIcon />
        </Button>
      </Flex>
    );
  };

  const Answer = () => {
    return (
      <>
        {hasPressedSelection &&
          <Card>
            <CardBody>
              <Text color={collect ? 'teal' : 'tomato'} as="b">
                {collect ? '正解' : '不正解'}
              </Text>
              <Text>{problem.question}は「{problem.answer}」という意味です。
              </Text>
            </CardBody>
          </Card>}
      </>
    );
  };

  return (
    <Stack mt={4}>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Problem />
            <Choices />
            <PageChanger />
          </Stack>
        </CardBody>
      </Card>
      <Answer />
    </Stack>
  );
};


export default function Home() {
  return (
    <>
      <Topbar />
      <Container>
        <Ngsl />
      </Container>
    </>
  );
}
