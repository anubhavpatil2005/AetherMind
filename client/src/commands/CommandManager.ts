export interface Command {

    execute(): void;

    undo(): void;

}

export class CommandManager {

    execute(command: Command) {

        command.execute();

    }

}