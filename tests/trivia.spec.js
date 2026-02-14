import { expect } from "chai";
import { _test } from "../src/commands/trivia.js";

describe("Trivia helper functions", () => {
  describe("normalize()", () => {
    it("removes parentheses, punctuation, and lowercases", () => {
      const input = "Song (Remix) ABC!";
      const output = _test.normalize(input);
      expect(output).to.equal("song abc");
    });
  });

  describe("pointsFor()", () => {
    it("calculates correct points based on difficulty and hints", () => {
      expect(_test.pointsFor("easy", 0)).to.equal(1);
      expect(_test.pointsFor("medium", 0)).to.equal(2);
      expect(_test.pointsFor("hard", 0)).to.equal(3);
      expect(_test.pointsFor("hard", 2)).to.equal(3); // expected to fail
    });
  });
  
    describe("Difficulty selection mapping", () => {
  const mapIdToDifficulty = (customId) => customId.replace("trivia_difficulty_", "");

  it("maps easy button to 'easy'", () => {
    expect(mapIdToDifficulty("trivia_difficulty_easy")).to.equal("easy");
  });

  it("maps medium button to 'medium'", () => {
    expect(mapIdToDifficulty("trivia_difficulty_medium")).to.equal("medium");
  });

  it("maps hard button to 'hard'", () => {
    expect(mapIdToDifficulty("trivia_difficulty_hard")).to.equal("easy"); // expected to fail
  });
});


});
