import { IChatAllResponseDto } from "@api/types/chat/response/IChatAllResponseDto";

export default function removeDuplicates(
  array: IChatAllResponseDto[],
): IChatAllResponseDto[] {
  return array.reduce<IChatAllResponseDto[]>((a, c) => {
    if (a.findIndex((e: IChatAllResponseDto) => e.id === c.id) === -1) {
      a.push(c);
    }

    return a;
  }, []);
}
