import { execFileSync, spawn } from 'node:child_process';
import { realpathSync } from 'node:fs';

const port = '4210';

function run(command, args) {
    return execFileSync(command, args, {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
    });
}

function getWindowsPortPids() {
    const output = run('netstat', ['-ano', '-p', 'tcp']);
    const pids = new Set();

    for (const line of output.split(/\r?\n/)) {
        if (!line.includes(`:${port}`) || !line.includes('LISTENING')) {
            continue;
        }

        const parts = line.trim().split(/\s+/);
        const pid = parts.at(-1);
        if (pid && pid !== String(process.pid)) {
            pids.add(pid);
        }
    }

    return [...pids];
}

function getUnixPortPids() {
    try {
        return run('lsof', ['-ti', `tcp:${port}`])
            .split(/\r?\n/)
            .map(value => value.trim())
            .filter(Boolean)
            .filter(pid => pid !== String(process.pid));
    } catch {
        return [];
    }
}

function freePort() {
    const pids = process.platform === 'win32' ? getWindowsPortPids() : getUnixPortPids();

    for (const pid of pids) {
        if (process.platform === 'win32') {
            execFileSync('taskkill', ['/PID', pid, '/T', '/F'], { stdio: 'ignore' });
        } else {
            execFileSync('kill', ['-TERM', pid], { stdio: 'ignore' });
        }
        console.log(`Freed port ${port} from process ${pid}.`);
    }
}

freePort();

process.chdir(realpathSync.native(process.cwd()));

const child = spawn('next', ['dev', '--webpack', '--port', port], {
    shell: true,
    stdio: 'inherit',
});

function stopChild() {
    if (!child.killed) {
        child.kill();
    }
}

process.on('SIGINT', stopChild);
process.on('SIGTERM', stopChild);

child.on('exit', code => {
    process.exit(code ?? 0);
});
