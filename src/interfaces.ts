export interface Command {
    name: string
    alias?: string|string[]
    description?: string
    longDescription?: string
    flags?: Flag[]
    options?: Option[]
    arguments?: Argument[]
    /**
     * Executed when the command matches.
     *
     * @param options Named arguments, options, and flags.
     * @param args Positional arguments.
     * @param app Entire app config.
     */
    execute(options: Record<string,any>, args: string[], app: App): Promise<number|void>
}

export enum OptType {
    STRING,
    BOOL,
    INT,
    FLOAT,
    /** A string, truncated and converted to lowercase. */
    ENUM,
    /** File must be readable. Single dash will be converted to STDIN. */
    INPUT_FILE,
    /** Directory must be readable. */
    INPUT_DIRECTORY,
    /** File's directory must exist and be writeable. Single dash will be converted to STDOUT. */
    OUTPUT_FILE,
    OUTPUT_DIRECTORY,
    /** An empty or non-existent directory. */
    EMPTY_DIRECTORY,
}

interface ArgumentOrOptionOrFlag {
    /** Name of the option to display in help. */
    name: string
    /** Alternative name for this option. */
    alias?: string|string[]
    /** Description of the option. */
    description?: string
    /** Default value if not provided. */
    defaultValue?: any|((value:string)=>any)
    /** Default value to display in help. */
    defaultValueText?: string
    /** Property name to use in `execute()` options. */
    key?: string
}

export type AnyOptType = OptType | string[] // | ((value:string)=>any)

export interface ArgumentOrOption extends ArgumentOrOptionOrFlag {
    /** Type to coerce the option value to. */
    type?: AnyOptType
    /** Option is repeatable by specifying the flag again. Value will be an array. */
    repeatable?: boolean
    /** Option is required. */
    required?: boolean
}

/** Boolean flag. */
export interface Flag extends ArgumentOrOptionOrFlag,OptionOrFlag {

}

/** Positional argument. */
export interface Argument extends ArgumentOrOption {

}

interface OptionOrFlag {
    valueNotRequired?: boolean
}

/** Option with value. */
export interface Option extends ArgumentOrOption,OptionOrFlag {
    /** Placeholder value to use in help. */
    valuePlaceholder?: string
}

export interface App {
    name: string
    argv0?: string
    version?: string
    commands: Command[]
    globalOptions?: Option[]
}
