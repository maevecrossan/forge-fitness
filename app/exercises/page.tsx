'use client';

import { useEffect, useRef, useState } from 'react';

type Exercise = {
    id: string;
    name: string;
    category: string;
    primaryMuscle: string;
    equipment?: string | null;
    modality?: string | null;
    description?: string | null;
};