import {draftMode} from "next/headers"
import { NextRequest, NextResponse } from "next/server"
export async function get(request : NextRequest) {
  (await draftMode() ).disable()
  return NextResponse.redirect(new URL("/" + request.url))
}
