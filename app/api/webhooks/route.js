import crypto from "crypto"
import { NextResponse } from "next/server";

export const POST = (req) => {
    const receivedSignature = req.headers['x-appwrite-webhook-signature'];
    const secret = "40af3aa2b5af8c8d42b6d3cd9433128b6ed194ca4af106276c7ea266bc657069fe1589af072d3455183c789275c475689676fa6228d23cc3e9df0ecefac5e074";
    const payload = JSON.stringify(req.body);

    const hmac = crypto.createHmac('sha1', secret);
    hmac.update(payload);
    const computedSignature = hmac.digest('hex');

    if (computedSignature === receivedSignature) {
        console.log('Valid Signature');
        return true;
    } else {
        console.log('Invalid Signature');
        return false;
    }

    return NextResponse.json({})
}