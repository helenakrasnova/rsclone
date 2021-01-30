import PersonPageService from './PersonPageService';
import axios, { AxiosResponse } from 'axios';
import { PersonDetailsResponseDto } from './../models/PersonDetails/Dtos/PersonDetailsResponseDto';
import { PersonCreditsResponseDto, Cast } from './../models/PersonDetails/Dtos/PersonCreditsResponseDto';
import { PersonImagesResponseDto } from '../models/PersonDetails/Dtos/PersonImagesResponseDto';
import { PersonDetailsViewModel } from './../models/PersonDetails/ViewModels/PersonDetailsViewModel';
import { CastViewModel } from '../models/PersonDetails/ViewModels/PersonCreditsViewModel';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const personDetailsResponseDtoMock = {
  "adult": false,
  "also_known_as": [
    "Ana Celia de Armas",
    "Ana Celia de Armas Caso",
  ],
  "biography": "Ana de Armas was born in Cuba on April 30, 1988. At the age of 14, she began her studies at the National Theatre School of Havana, where she graduated after 4 years. She made her film debut with Una rosa de Francia (2006), which was directed by Manuel Gutiérrez Aragón. In 2006 she moved to Spain where she continued her film career, and started doing television. She currently lives between Madrid and Barcelona. Ana is known for her roles on Knock Knock (2015), War Dogs (2016), Hands Of Stone (2016) and Blade Runner 2049 (2017).",
  "birthday": "1988-04-30",
  "deathday": null,
  "gender": 1,
  "id": 224513,
  "imdb_id": "nm1869101",
  "known_for_department": "Acting",
  "name": "Ana de Armas",
  "place_of_birth": "Santa Cruz del Norte, Cuba",
  "profile_path": "/14uxt0jH28J9zn4vNQNTae3Bmr7.jpg"
}

const personCreditsResponseDtoMock = {
  "cast": [
    {
      "id": 80279,
      "poster_path": "/57ZbYBtXomPjqv3fYmdIu7Fh4GD.jpg",
      "release_date": "2011-10-14",
      "title": "Blind Alley",
      "vote_average": 5.2,
      "vote_count": 17,
      "popularity": 1.231,
      "character": "Rosa / Laura",
    }
  ],
  "crew": []
};
const personImagesResponseDtoMock: PersonImagesResponseDto = {
  "id": 224513,
  "profiles": [
    {
      "aspect_ratio": 0.6666666666666666,
      "file_path": "/14uxt0jH28J9zn4vNQNTae3Bmr7.jpg",
      "height": 900,
      "iso_639_1": null,
      "vote_average": 6.478,
      "vote_count": 53,
      "width": 600
    }
  ]
}
describe('PersonPageService tests', () => {
  const personPageService = new PersonPageService();

  let actualResult: PersonDetailsViewModel;
  let castResult: CastViewModel | undefined;
  beforeAll(async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: personDetailsResponseDtoMock })
      .mockResolvedValueOnce({ data: personCreditsResponseDtoMock })
      .mockResolvedValueOnce({ data: personImagesResponseDtoMock });
    actualResult = await personPageService.getPerson('555');
    castResult = actualResult.credits?.cast[0];
  });
  describe('getPerson personDetails', () => {
    test('getPerson personDetails returned', () => {
      expect(actualResult).toBeDefined();
    });

    test('also_known_as mapped', () => {
      expect(actualResult.also_known_as).toEqual([
        "Ana Celia de Armas",
        "Ana Celia de Armas Caso",
      ]);
    });

    test('biography mapped', () => {
      expect(actualResult.biography).toEqual("Ana de Armas was born in Cuba on April 30, 1988. At the age of 14, she began her studies at the National Theatre School of Havana, where she graduated after 4 years. She made her film debut with Una rosa de Francia (2006), which was directed by Manuel Gutiérrez Aragón. In 2006 she moved to Spain where she continued her film career, and started doing television. She currently lives between Madrid and Barcelona. Ana is known for her roles on Knock Knock (2015), War Dogs (2016), Hands Of Stone (2016) and Blade Runner 2049 (2017).");
    });

    test('birthday mapped', () => {
      expect(actualResult.birthday).toEqual("1988-04-30");
    });

    test('deathday mapped', () => {
      expect(actualResult.deathday).toEqual(null);
    });

    test('gender mapped', () => {
      expect(actualResult.gender).toEqual(1);
    });

    test('id mapped', () => {
      expect(actualResult.id).toEqual(224513);
    });

    test('imdb_id mapped', () => {
      expect(actualResult.imdb_id).toEqual("nm1869101");
    });

    test('known_for_department mapped', () => {
      expect(actualResult.known_for_department).toEqual("Acting");
    });


    test('name mapped', () => {
      expect(actualResult.name).toEqual("Ana de Armas");
    });

    test('place_of_birth mapped', () => {
      expect(actualResult.place_of_birth).toEqual("Santa Cruz del Norte, Cuba");
    });

    test('profile_path mapped', () => {
      expect(actualResult.profile_path).toEqual("/14uxt0jH28J9zn4vNQNTae3Bmr7.jpg");
    });


  });

  describe('getPerson personCredits', () => {
    test('character mapped', () => {
      expect(castResult?.character).toEqual("Rosa / Laura");
    });

    test('id mapped', () => {
      expect(castResult?.id).toEqual(80279);
    });

    test('popularity mapped', () => {
      expect(castResult?.popularity).toEqual(1.231);
    });

    test('poster_path mapped', () => {
      expect(castResult?.poster_path).toEqual("/57ZbYBtXomPjqv3fYmdIu7Fh4GD.jpg");
    });

    test('release_date mapped', () => {
      expect(castResult?.release_date).toEqual("2011-10-14");
    });

    test('title mapped', () => {
      expect(castResult?.title).toEqual("Blind Alley");
    });

    test('vote_average mapped', () => {
      expect(castResult?.vote_average).toEqual(5.2);
    });

    test('vote_count mapped', () => {
      expect(castResult?.vote_count).toEqual(17);
    });

    test('crew mapped', () => {
      expect(actualResult.credits?.crew).toEqual([]);
    });

  });

  describe('getPerson personImages', () => {
    test('id mapped', () => {
      expect(actualResult.images?.id).toEqual(224513);
    });
    test('aspect_ratio mapped', () => {
      expect(actualResult.images?.profiles[0].aspect_ratio).toEqual(0.6666666666666666);
    });
    test('file_path mapped', () => {
      expect(actualResult.images?.profiles[0].file_path).toEqual("/14uxt0jH28J9zn4vNQNTae3Bmr7.jpg");
    });
    test('height mapped', () => {
      expect(actualResult.images?.profiles[0].height).toEqual(900);
    });

    test('iso_639_1 mapped', () => {
      expect(actualResult.images?.profiles[0].iso_639_1).toEqual(null);
    });
    test('vote_average mapped', () => {
      expect(actualResult.images?.profiles[0].vote_average).toEqual(6.478);
    });
    test('vote_count mapped', () => {
      expect(actualResult.images?.profiles[0].vote_count).toEqual(53);
    });
    test('width mapped', () => {
      expect(actualResult.images?.profiles[0].width).toEqual(600);
    });
  });
});

