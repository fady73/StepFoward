import React, { useState } from 'react';

const TournamentSchedule: React.FC = () => {
  const [groups, setGroups] = useState<number>(12);
  const [rounds, setRounds] = useState<number>(6);
  const [schedule, setSchedule] = useState<JSX.Element[]>([]);

  const handleGroupsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroups(parseInt(event.target.value));
  };

  const handleRoundsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRounds(parseInt(event.target.value));
  };

  // const generateRandomSchedule = () => {
  //   const schedule: JSX.Element[] = [];
  //   const groupNumbers = Array.from({ length: groups }, (_, i) => i + 1);

  //   for (let round = 1; round <= rounds; round++) {
  //     const roundSchedule: JSX.Element[] = [];
  //     const usedPairs: [number, number][] = [];

  //     // Shuffle the group numbers
  //     for (let i = groupNumbers.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [groupNumbers[i], groupNumbers[j]] = [groupNumbers[j], groupNumbers[i]];
  //     }

  //     for (let i = 0; i < groups / 2; i++) {
  //       let group1 = groupNumbers[i];
  //       let group2 = groupNumbers[groups - 1 - i];

  //       // Check if the pairing has already been used
  //       while (
  //         usedPairs.some(
  //           ([g1, g2]) =>
  //             (g1 === group1 && g2 === group2) || (g1 === group2 && g2 === group1)
  //         )
  //       ) {
  //         // Shuffle the group numbers again if the pairing has been used
  //         for (let j = groupNumbers.length - 1; j > 0; j--) {
  //           const k = Math.floor(Math.random() * (j + 1));
  //           [groupNumbers[j], groupNumbers[k]] = [groupNumbers[k], groupNumbers[j]];
  //         }
  //         group1 = groupNumbers[i];
  //         group2 = groupNumbers[groups - 1 - i];
  //       }

  //       // Add the new pairing to the list of used pairs
  //       usedPairs.push([group1, group2]);

  //       roundSchedule.push(
  //         <tr key={`round-${round}-group-${group1}-vs-group-${group2}`}>
  //           <td>{`Round ${round}`}</td>
  //           <td>{`Group ${group1}`}</td>
  //           <td>{`Group ${group2}`}</td>
  //         </tr>
  //       );
  //     }

  //     schedule.push(
  //       <div key={`round-${round}`} className="mb-8">
  //         <h3 className="text-xl font-bold mb-4">Round {round}</h3>
  //         <table className="w-full border-collapse">
  //           <thead>
  //             <tr className="bg-gray-200">
  //               <th className="py-2 px-4 text-left">Round</th>
  //               <th className="py-2 px-4 text-left">Group</th>
  //               <th className="py-2 px-4 text-left">Group</th>
  //             </tr>
  //           </thead>
  //           <tbody>{roundSchedule}</tbody>
  //         </table>
  //       </div>
  //     );
  //   }

  //   setSchedule(schedule);
  // };
  const generateSchedule = () => {
    const schedule: JSX.Element[] = [];

    const groupNumbers = Array.from({ length: groups }, (_, i) => i + 1);

    for (let round = 1; round <= rounds; round++) {
      const roundSchedule: JSX.Element[] = [];

      for (let i = 0; i < groups / 2; i++) {
        const group1 = groupNumbers[i];
        const group2 = groupNumbers[groups - 1 - i];

        roundSchedule.push(
          <tr key={`round-${round}-group-${group1}-vs-group-${group2}`}>
            <td>{`Round ${round}`}</td>
            <td>{`Group ${group1}`}</td>
            <td>{`Group ${group2}`}</td>
          </tr>
        );
      }

      schedule.push(
        <div key={`round-${round}`} className="mb-8">
          <h3 className="text-xl font-bold mb-4">Round {round}</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Round</th>
                <th className="py-2 px-4 text-left">Group</th>
                <th className="py-2 px-4 text-left">Group</th>
              </tr>
            </thead>
            <tbody>{roundSchedule}</tbody>
          </table>
        </div>
      );

      // Rotate the groups for the next round
      groupNumbers.splice(1, 0, groupNumbers.pop() as number);
    }

    setSchedule(schedule);
  };
  return (
    <div className="tournament-schedule mr-5 ml-5">
      <h2 className="text-2xl font-bold mb-4">Tournament Schedule</h2>
      <div className="mb-4">
        <label htmlFor="groups" className="block mb-2">
          عدد المجموعات :
        </label>
        <input
          type="number"
          id="groups"
          value={groups}
          onChange={handleGroupsChange}
          className="border-gray-300 rounded-md w-full px-2 py-1"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="rounds" className="block mb-2">
          عدد الالعاب :
        </label>
        <input
          type="number"
          id="rounds"
          value={rounds}
          onChange={handleRoundsChange}
          className="border-gray-300 rounded-md w-full px-2 py-1"
        />
      </div>
      <button
        onClick={generateSchedule}
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 mb-4 w-full"
      >
        Generate Random Schedule
      </button>
      <div className="schedule">{schedule}</div>
    </div>
  );
};

export default TournamentSchedule;
