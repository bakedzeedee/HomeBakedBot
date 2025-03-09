export const USER = 1;
export const VIP = 2;
export const MOD = 3;
export const BROADCASTER = 4;
export const SUPERUSER = 5;

export const getGroupLevel = (context) => {
    const superUsers = process.env.REACT_APP_T_SUPER_USERS?.split(", ") ?? []; // explicitly indicated users to be treated with broadcaster permissions
    let groupLevel = '';

    if (superUsers.includes(context.username)) groupLevel = SUPERUSER;
    else if (context.badges?.broadcaster === '1') groupLevel = BROADCASTER;
    else if (context.mod) groupLevel = MOD;
    else if (context.badges?.vip) groupLevel = VIP;
    else groupLevel = USER;

    return groupLevel;
}