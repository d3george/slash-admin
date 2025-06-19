import { faker } from "@faker-js/faker";

export const fakeAvatars = (count: number) => {
	const result: string[] = [];
	for (let index = 0; index < count; index += 1) {
		result.push(faker.image.avatarGitHub());
	}
	return result;
};
