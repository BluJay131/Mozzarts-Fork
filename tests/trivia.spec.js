import { expect } from "chai";
import { _test } from "../src/commands/trivia.js";
import { makeSongQuestion, createTriviaQuestion } from "../src/helpers/trivia.js";
import { makeHint } from "../src/helpers/hintHelper.js";

describe("Trivia helper functions", () => {
  describe("normalize()", () => {
    it("removes parentheses, punctuation, and lowercases", () => {
      const input = "Song (Remix) ABC!";
      const output = _test.normalize(input);
      expect(output).to.equal("song abc");
    });
  });

  describe("pointsFor()", () => {
    it("returns base points for a difficulty level (hints ignored)", () => {
      expect(_test.pointsFor("easy")).to.equal(1);
      expect(_test.pointsFor("medium")).to.equal(2);
      expect(_test.pointsFor("hard")).to.equal(3);
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
    expect(mapIdToDifficulty("trivia_difficulty_hard")).to.equal("hard");
  });
});


});

// ---------------------------------------------------------------------------
// new tests for song-based question generation

describe("makeSongQuestion()", () => {
  // we provide a fake other-track generator instead of touching the import
  const fakeOther = async () => ({
    artistName: "Other Artist",
    collectionName: "Other Album",
    primaryGenreName: "Other Genre",
    releaseDate: "2000-01-01",
    trackName: "Other Track",
  });

  it("produces a question with four options including the correct answer", async () => {
    const track = {
      artistName: "Test Artist",
      collectionName: "Test Album",
      primaryGenreName: "Test Genre",
      releaseDate: "2021-05-05",
      trackName: "Test Track",
    };
    const question = await makeSongQuestion(track, "easy", fakeOther);
    expect(question).to.have.property("question");
    expect(question.options).to.be.an("array").with.lengthOf(4);
    expect(question.options).to.include(question.correctAnswer);
  });
});

// verify the UI helper doesn't generate excessively long customIds

describe("createTriviaQuestion()", () => {
  it("builds four buttons with numeric IDs matching options", () => {
    const sample = {
      question: "Test?",
      difficulty: "easy",
      points: 1,
      options: ["A", "B", "C", "D"],
      correctAnswer: "A",
    };
    const { actionRow } = createTriviaQuestion(sample);
    expect(actionRow.components).to.have.lengthOf(4);
    actionRow.components.forEach((btn, idx) => {
      expect(btn.data.custom_id).to.equal(`trivia_answer_${idx}`);
      expect(btn.data.label).to.equal(sample.options[idx]);
    });
  });
});

// simple hint helper test

describe("makeHint()", () => {
  it("returns a nonempty string for a track", () => {
    const track = { artistName: "Foo", trackName: "Bar" };
    const hint = makeHint(track);
    expect(hint).to.be.a("string").and.to.have.length.greaterThan(0);
  });
});
